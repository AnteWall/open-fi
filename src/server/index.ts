import { OpenAPI, useSofa } from "sofa-api";
import { fullScrapeQueue, scrapeQueue } from "./worker/worker";

import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import YAML from "yamljs";
import client from "./prisma";
import express from "express";
import http from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";
import path from "path";
import resolvers from "./resolvers";
import swaggerUi from "swagger-ui-express";
import typeDefs from "./typeDefs";

const swaggerDocument = YAML.load("./swagger.yml");

async function startApolloServer(port: string | number) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);
  await client.$connect();
  // Same ApolloServer initialization as before, plus the drain plugin.

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });

  const server = new ApolloServer({
    schema,
    introspection: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,
    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: "/graphql",
  });

  const openApi = OpenAPI({
    schema,
    info: {
      title: "Open-FI API",
      version: "1.0.0",
    },
  });

  app.use(
    "/api/v1",
    useSofa({
      schema,
      basePath: "/api/v1",
      onRoute(info) {
        openApi.addRoute(info, {
          basePath: "/api/v1",
        });
      },
    })
  );
  openApi.save("./swagger.yml");

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  // Modified server startup
  await new Promise<void>((resolve, reject) => {
    httpServer
      .listen({ port: Number(port) }, async () => {
        await fullScrapeQueue.add("", {
          jobId: "full-sync",
        });
        await scrapeQueue.empty()
        await scrapeQueue.add({ id: 'foo' }, {
          repeat: { every: 60000, limit: 1 },
          jobId: 'foo-id'
        });

        resolve();
      })
      .once("error", reject);
  });
}

async function main() {
  try {
    await startApolloServer(process.env.PORT || 4000);
    console.log("🚀 Server is ready at http://localhost:4000/graphql");
  } catch (err) {
    console.error("💀 Error starting the node server", err);
  }
}

void main();
