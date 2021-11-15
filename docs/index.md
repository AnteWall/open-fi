# Welcome to Open FI documentation

## Overview

[Insynsregistret][1] is a Swedish financial registry maintained by
the [Finansinspektionen][2] (FI). It contains information regarding insider trading on different trading venues.

Open FI provides a API to access this data easily for developers.

## API:s

Open FI has 2 endpoints, one GraphQL endpoint and one REST endpoint. Open FI is created for GraphQL and REST endpoints is automatticlly genereated using [sofa](https://www.sofa-api.com/).

[GraphQL Playground][graphql-docs]

Endpoint `https://open-fi.herokuapp.com/graphql`

[REST Documentation][swagger-docs]

Endpoint `https://open-fi.herokuapp.com/api/v1`

### Pagination

Pagination is based on Relay GraphQL cursor based pagination. If you want to know more on how that works you can read this [article](https://relay.dev/graphql/connections.htm)

## Notes

Open FI is hosted privately and free to use! However due to this we don't provide any SLA uptime. Things might go down or be overloaded. All of Open FI is open source and available on [Github][3] to host yourself! Check [deployment session](/deployment) for more information.

[1]: https://www.fi.se/en/our-registers/pdmr-transactions
[2]: https://www.fi.se/en
[3]: https://github.com/AnteWall/open-fi
[graphql-docs]: https://open-fi.herokuapp.com/graphql
[swagger-docs]: https://open-fi.herokuapp.com/api-docs
