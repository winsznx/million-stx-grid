import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    include: ["**/*.test.ts", "**/*.test.tsx"],
    coverage: {
      reporter: ["text", "html"],
      include: ["lib/**", "hooks/**", "components/**"],
      exclude: ["**/*.test.*", "**/*.d.ts"],
    },
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: {
    alias: {
      "@": new URL("./", import.meta.url).pathname,
    },
  },
});
