import { sql } from "../database/database.js";

const allListItems = async () => {
  const rows= await sql `SELECT COUNT(*) FROM shopping_list_items `;
  if (rows && rows.length > 0){
    const count = parseInt(rows[0].count, 10); 
    return count > 0 ? count : "No shopping list items yet."; 
  }
  return "No shopping list items  yet.";
}

const findCurrentListEntry = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items 
    WHERE shopping_list_id  = ${ listId }
    ORDER BY collected ASC, name ASC`;
  if (rows && rows.length > 0) {
    return rows;
  }
  return false;
};

const createListEntry = async (listId, name) => {
  await sql`INSERT INTO
    shopping_list_items (shopping_list_id,name) VALUES (${ listId},${name })`;
};

const markCollectItem = async (listId) => {
  await sql`UPDATE shopping_list_items SET collected = true WHERE id= ${listId}`
}

export {findCurrentListEntry,createListEntry,markCollectItem, allListItems};
