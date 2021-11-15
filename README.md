# Open-Fi

[Insynsregistret][1] is a Swedish financial registry maintained by
the [Finansinspektionen][2] (FI). It contains information regarding insider trading on different trading venues.

This is a project creating a scraper and open api to easily fetch and expose this data for developers. Since the data is free, so is also this code and open source.

Roadmap:

- [x] Able to scrape data from [FI][2] registry
  - [x] Insider trades
- [x] Save data into database
- [x] Expose data trough a GraphQL endpoint
- [x] Expose data trough REST endpoint
- [ ] Add higher rate limit if API keys are set

## Development

Start by installing dependencies

`yarn install`

### Run dev server

To start a development server run the following command.

`yarn dev`

### Generated GraphQL Typescript interfaces

We use GraphqlCodegen to type Resolvers and other stuff for the GraphQL server.

To regenerate them call

`yarn graphql-codegen`

[1]: https://www.fi.se/en/our-registers/pdmr-transactions
[2]: https://www.fi.se/en
