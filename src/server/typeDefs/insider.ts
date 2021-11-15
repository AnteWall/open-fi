import { InsiderTrade } from "./../generated/graphql";
import { gql } from "apollo-server-core";

export default gql`
  type InsiderTrade {
    id: String!
    publicationDateTime: DateTime!
    issuer: String!
    leiCode: String!
    notifier: String!
    managerialResponsibilities: String!
    position: String!
    closelyAssociated: Boolean!
    amendment: Boolean!
    amendmentDetails: String!
    initialNotification: String!
    shareOrOptionProgram: Boolean!
    transactionType: String!
    instrumentType: String!
    instrumentName: String!
    isin: String!
    transactionDateTime: DateTime!
    volume: Float!
    unit: String!
    price: Float!
    currency: String!
    venue: String!
    status: String!
  }

  type InsiderTradeEdge {
    cursor: String!
    node: InsiderTrade!
  }

  type InsiderTradeConnection {
    edges: [InsiderTradeEdge!]!
    pageInfo: PageInfo!
    totalCount: Int!
  }
`;
