// For adding and listing list s, we need two functions. 
//One function is used for creating list s, and one function is used for 
//listing list s. When listing list s, we are only interested in list s that have not 
//yet been completed. Let's call these functions create and findAllNonCompletedTasks.



// After modificaation: we can retrieve individual list s. When a user makes a request to 
//the path /list s/{id}, information about a list  with the database id {id} is shown. 
//Let's add a function called findById into the file list Service.js.

//The function findById retrieves a list  from the database with a 
//specific id. If the list  does not exist, the function returns an object
// with the name unknown and id 0.

import { sql } from "../database/database.js";

const create = async (name) => {
  await sql`INSERT INTO shopping_lists (name) VALUES (${ name })`;
};

const findAllActiveLists = async () => {
  return await sql`SELECT * FROM shopping_lists  WHERE active = true`;
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM shopping_lists  WHERE id = ${ id }`;
  console.log("find by id", rows)
  if (rows && rows.length > 0) {
    return rows[0];
  }
  return { id: 0, name: "Unknown" };
};

const completeById = async (id) => {
  await sql`UPDATE shopping_lists  SET active = false WHERE id = ${ id }`;
};





/*
// this is Service for retrieving items by list ID, ordered alphabetically and by collected status
const getItemsByListId = async (listId) => {
  const result = await sql(
    "SELECT * FROM shopping_list_items WHERE shopping_list_id = $1 ORDER BY collected, name ASC;",
    listId
  );
  return result.rows;
};
*/
export {create, findAllActiveLists, findById, completeById};