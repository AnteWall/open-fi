import { QueryResolvers } from "../generated/graphql";
import client from "../prisma";
import { findManyCursorConnection } from "@devoxa/prisma-relay-cursor-connection";

const resolver: QueryResolvers = {
  insider: async (_, { cursor, last = 10 }) => {
    last = Math.min(last, 10);

    client.insiderTrade.findMany({
      orderBy: {
        publicationDateTime: "desc",
      },
    });

    const result = await findManyCursorConnection(
      (args) =>
        client.insiderTrade.findMany({
          ...args,
          orderBy: {
            publicationDateTime: "desc",
          },
        }),
      () => client.insiderTrade.count(),
      { last, before: cursor }
    );

    return result;
  },
};

export default resolver;
