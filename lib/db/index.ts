import { drizzle } from "drizzle-orm/d1";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import * as schema from "./schema";

export async function getDb() {
  const { env } = await getCloudflareContext({ async: true });
  const db = (env as CloudflareEnv).DB;
  if (!db) {
    throw new Error("D1 database binding DB is not configured");
  }
  return drizzle(db, { schema });
}

export type Database = Awaited<ReturnType<typeof getDb>>;
