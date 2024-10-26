import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({
    host: "localhost",
    database: "shopping",
    username: "myuser",
    password: "myuser",
    port: 5432,
    max: 2, // use at most 2 concurrent connections
  });
}

export { sql };