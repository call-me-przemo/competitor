import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["server/tests/**/*.integration.test.ts"],
    // globalSetup: ["server/tests/helpers/setup-database.ts"],
    setupFiles: [],
    threads: false,
  },
});
