import { defineConfig } from "@playwright/test"

export default defineConfig({
  reporter: [
    ["html"],
    ["list"]
  ],
  testDir: "./tests",

  use: {
    baseURL: "http://localhost:3000",
    headless: true,
  },

  webServer: {
    command: "npm run dev",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
})