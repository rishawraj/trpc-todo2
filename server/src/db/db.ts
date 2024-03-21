import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema.js";
import { configDotenv } from "dotenv";
configDotenv();

export const sql = neon(process.env.DB_URL as string);
export const db = drizzle(sql, { schema });
