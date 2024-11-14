import { postgres } from "../deps.js";
import { config } from "https://deno.land/x/dotenv/mod.ts";

// Load environment variables from the .env file
const env = config();

let sql;

if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({
    host: env.PGHOST,
    database: env.PGDATABASE,
    username: env.PGUSER, 
    password: env.PGPASSWORD, 
    port: parseInt(env.PGPORT), 
    max: parseInt(env.PGMAXCONNECTIONS), 
  });
}

export { sql };
