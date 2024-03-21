import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./db.js";

await migrate(db, { migrationsFolder: "./drizzle" });
