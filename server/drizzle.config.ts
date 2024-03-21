import type { Config } from "drizzle-kit";

import { configDotenv } from "dotenv";
configDotenv();

const dbUrl = process.env.DB_URL || "";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: dbUrl,
  },
} satisfies Config;
