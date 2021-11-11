import InsiderTradeResolver from "./InsiderTradeResolver";
import QueryResolver from "./QueryResolver";
import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  InsiderTrade: InsiderTradeResolver,
  Query: QueryResolver,
};

export default resolvers;
