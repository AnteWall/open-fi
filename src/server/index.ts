import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import client from "./prisma";
import express from "express";
import http from "http";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

async function startApolloServer(port: number) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = http.createServer(app);

  await client.$connect();
  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
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

  // Modified server startup
  await new Promise<void>((resolve, reject) =>
    httpServer.listen({ port: port }, resolve).once("error", reject)
  );
}

async function main() {
  try {
    await startApolloServer(4000);
    console.log("🚀 Server is ready at http://localhost:4000/graphql");
  } catch (err) {
    console.error("💀 Error starting the node server", err);
  }
}

void main();
