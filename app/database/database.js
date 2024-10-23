import { postgres } from "../deps.js";
import { config } from "https://deno.land/x/dotenv/mod.ts"; // Import dotenv


let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({});
}

export { sql };