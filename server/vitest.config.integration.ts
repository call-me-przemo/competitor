import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["server/tests/**/*.integration.test.ts"],
    threads: false,
    server: {
      deps: {
        inline: ["@fastify/autoload"],
      },
    },
  },
});
