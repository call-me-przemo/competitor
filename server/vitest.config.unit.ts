import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["server/tests/**/*.unit.test.ts"],
  },
});
