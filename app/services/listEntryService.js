//For the work entries, we need three functions. One function is used for creating a 
//work entry for a given task, one function is used for finding a currently active (non-completed) 
//work entry, and one function is used for completing a given work entry. Let's call these functions 
//createWorkEntry, findCurrentWorkEntry, and finishWorkEntry.
import { sql } from "../database/database.js";

const findCurrentListEntry = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items 
    WHERE shopping_list_id  = ${ listId } AND collected = false`;
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


const findAllActiveItems =async(name) =>{
  return await sql`SELECT * name FROM shopping_list_items where collected=false`;
}

/*
const getItemsByListId = async (listId) => {
  const result = await executeQuery(
    "SELECT * FROM shopping_list_items WHERE shopping_list_id"
  )
}

const finishListEntry = async (id) => {
  await sql`UPDATE shopping_list_items
    SET collected= NOW() WHERE id = ${ id }`;
};

*/

export {findCurrentListEntry,createListEntry,markCollectItem};
