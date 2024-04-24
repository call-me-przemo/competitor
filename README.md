# Competitor

App for managing running sport events.

## Requirements

To run app locally you must have installed following software.

- [node.js](https://nodejs.org/en)
- [pnpm](https://pnpm.io/)
- [docker](https://docker.com)

## Launching the app

This repo uses local [nx](https://nx.dev/) installation for management.

To launch app you need to:

1. Install dependencies using pnpm

```sh
pnpm i
```

2. Generate prisma client

```sh
pnpm nx prisma-generate server
```

3. Spin up database

```sh
docker compose up -d
```

4. Migrate database

```sh
pnpm nx prisma-migrate-dev server
```

5. Run services

```sh
pnpm nx run-many -t serve
```
