# Deploy

To deploy your own instance of Open FI follow the steps below!

OpenFI uses one Redis instance for background workers. One PostgreSQL instance to save all data. It also uses [prisma.io](https://prisma.io) for database ORM and migrations.

### Docker compose

```yaml
version: "3"
services:
  app:
    build: .
    ports:
      - "4000:4000"
    environment:
      - DATABASE_URL="postgresql://postgres:postgres@db:5432/openfi?schema=public"
      - REDIS_URL=redis://redis:6379
    depends_on:
      - redis
      - db
  redis:
    image: redis:latest
    ports:
      - "6379:6379"
  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=openfi
    ports:
      - "5432:5432"
```
