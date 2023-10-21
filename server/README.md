# Server part

This is server part of the application created using `fastify` as REST API and `prisma` as database layer.

## Development

### Setting up database

Before setting up the database ensure that `mysql` container is runnig checkout [README](../README.md) for details.

Use prisma cli commands to migrate and seed db.

- to migrate

```bash
pnpm prisma migrate dev
```

- to seed (this one may take a while)

```bash
pnpm prisma db seed
```

### Staring server

Checkout [package.json](package.json#L9) for available commands.

### Endpoints documentation

Endpoints are documented using `swagger`, open `/documentation` in you browser to show docs.
