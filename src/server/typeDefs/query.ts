import { gql } from "apollo-server-core";

export default gql`
  type Query {
    insider(last: Int, cursor: String): InsiderTradeConnection!
  }
`;
