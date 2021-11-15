import InsiderTradeResolver from "./InsiderTradeResolver";
import QueryResolver from "./QueryResolver";
import { Resolvers } from "../generated/graphql";
import { DateTimeResolver } from "graphql-scalars";

const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  InsiderTrade: InsiderTradeResolver,
  Query: QueryResolver,
};

export default resolvers;
