import insider from "./insider";
import { mergeTypeDefs } from "@graphql-tools/merge";
import pagination from "./pagination";
import query from "./query";
import { DateTimeTypeDefinition } from "graphql-scalars";

export default mergeTypeDefs([
  DateTimeTypeDefinition,
  pagination,
  insider,
  query,
]);
