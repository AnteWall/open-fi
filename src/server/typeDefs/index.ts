import { mergeTypeDefs } from "@graphql-tools/merge";
import insider from "./insider";
import query from "./query";

export default mergeTypeDefs([insider, query]);
