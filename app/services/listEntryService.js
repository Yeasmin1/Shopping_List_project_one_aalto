//For the work entries, we need three functions. One function is used for creating a 
//work entry for a given task, one function is used for finding a currently active (non-completed) 
//work entry, and one function is used for completing a given work entry. Let's call these functions 
//createWorkEntry, findCurrentWorkEntry, and finishWorkEntry.
import { sql } from "../database/database.js";

const createListEntry = async (listId) => {
  await sql`INSERT INTO
    shopping_list_items ( shopping_list_id )
    VALUES (${listId}, NOW())`;
};

const findCurrentListEntry = async (listId) => {
  const rows = await sql`SELECT * FROM shopping_list_items 
    WHERE shopping_list_id  = ${ listId } AND collected = false`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return false;
};

const finishListEntry = async (id) => {
  await sql`UPDATE shopping_list_items
    SET collected= NOW() WHERE id = ${ id }`;
};

const calculateTotalTime = async (taskId) => {
    const rows = await sql`SELECT SUM(finished_on - started_on) AS total_time
        FROM work_entries
        WHERE task_id = ${ taskId }
          AND finished_on IS NOT NULL`;
  
    if (rows && rows[0] && rows[0].total_time) {
      return rows[0].total_time;
    }
  
    return 0;
  };

export { createListEntry, findCurrentListEntry, finishListEntry, calculateTotalTime};