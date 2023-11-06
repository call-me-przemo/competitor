# Competitor

App for managing sports events.

## Development

### Requirements

You should have following software installed on your system to develop app.

- [docker](https://docs.docker.com/engine/install/)
- [node.js](https://nodejs.org/en) (preferably using [volta](https://docs.volta.sh/guide/getting-started))
- [pnpm](https://pnpm.io/) (you can install it using `volta` similar to installing `node.js`)

### Running database

To run database use `docker compose` - in the root folder of app execute:

```bash
docker compose up -d
```

### Preparing database

To migrate database execute:

```bash
pnpm server:db:migrate
```

To seed data execute:

```bash
pnpm server:db:seed
```

### Running apps

To run apps use `pnpm` commands. Checkout [package.json](package.json) for available commands.

## Related documentation

- [server part](server/README.md)
- [browser part](browser/README.md)
