import { readFileSync } from "node:fs";
import { Pool } from "@neondatabase/serverless";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("Set DATABASE_URL first (see .env.example).");
  process.exit(1);
}

const pool = new Pool({ connectionString });
const schema = readFileSync(new URL("../lib/schema.sql", import.meta.url), "utf8");

try {
  await pool.query(schema);
  console.log("Schema applied.");
} catch (error) {
  console.error("Could not apply schema:", error.message);
  process.exitCode = 1;
} finally {
  await pool.end();
}
