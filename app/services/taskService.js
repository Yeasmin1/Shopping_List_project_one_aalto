// For adding and listing tasks, we need two functions. 
//One function is used for creating tasks, and one function is used for 
//listing tasks. When listing tasks, we are only interested in tasks that have not 
//yet been completed. Let's call these functions create and findAllNonCompletedTasks.



// After modificaation: we can retrieve individual tasks. When a user makes a request to 
//the path /tasks/{id}, information about a task with the database id {id} is shown. 
//Let's add a function called findById into the file taskService.js.

//The function findById retrieves a task from the database with a 
//specific id. If the task does not exist, the function returns an object
// with the name unknown and id 0.

import { sql } from "../database/database.js";

const completeById = async (id) => {
  await sql`UPDATE tasks SET completed = true WHERE id = ${ id }`;
};

const create = async (name) => {
  await sql`INSERT INTO tasks (name) VALUES (${ name })`;
};

const findAllNonCompletedTasks = async () => {
  return await sql`SELECT * FROM tasks WHERE completed = false`;
};

const findById = async (id) => {
  const rows = await sql`SELECT * FROM tasks WHERE id = ${ id }`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, name: "Unknown" };
};

export { completeById, create, findAllNonCompletedTasks, findById };