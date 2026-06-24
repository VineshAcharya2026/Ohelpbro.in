import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./migrations",
  dialect: "sqlite",
  driver: "d1-http",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
    databaseId: "682073e2-cb9c-4689-acc6-0c1e5a7b5b8b",
    token: process.env.CLOUDFLARE_API_TOKEN!,
  },
});
