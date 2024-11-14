import { sql } from "../database/database.js";

const allLists = async () => {
  const rows = await sql `SELECT COUNT(*) FROM shopping_lists `;
  if (rows && rows.length > 0) {
    const count = parseInt(rows[0].count, 10); 
    return count > 0 ? count : "No shopping lists yet.";
  }
  return "No shopping lists yet.";
}

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists  WHERE active = true`;
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists  WHERE id = ${ id }`;
  if (rows && rows.length > 0) {
    return rows[0];
  }
  return { id: 0, name: "Unknown" };
};

const completeById = async (id) => {
  await sql`UPDATE shopping_lists  SET active = false WHERE id = ${ id }`;
};

export {create, findAllActiveLists, findById, completeById, allLists};