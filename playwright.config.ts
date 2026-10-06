import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  retries: 1,

  reporter: [["html"], ["list"]],

  use: {
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    trace: "retain-on-failure",
  },
});
