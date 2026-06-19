import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"

// Load .env.test in test environment, otherwise .env.local
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.local"
console.log("process.env.NODE_ENV", process.env.NODE_ENV)
dotenv.config({ path: envFile })

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
})
