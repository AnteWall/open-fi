import insider from "./insider";
import { mergeTypeDefs } from "@graphql-tools/merge";
import pagination from "./pagination";
import query from "./query";

export default mergeTypeDefs([pagination, insider, query]);
