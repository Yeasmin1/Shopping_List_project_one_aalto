// Two controller functions are needed for the current functionality. The first one is responsible for showing the page with current tasks, and the other
// is responsible for adding a task. Let's call these functions viewTasks and addTask.


// added view task function : Now, we can implement the functionality needed 
//for showing a specific task. We call the function viewTask. The function will 
//extract the id of the specific task from the url, and use that id to retrieve a 
//task using the findById function from taskService.js. In addition, viewTask will 
//also use the findCurrentWorkEntry function from workEntryService.js for retrieving 
//the current work entry.

import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as taskService from "../services/taskService.js";
import * as workEntryService from "../services/workEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addTask = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");

  await taskService.create(name);

  return requestUtils.redirectTo("/tasks");
};

const viewTask = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");

  const data = {
    task: await taskService.findById(urlParts[2]),
    currentWorkEntry: await workEntryService.findCurrentWorkEntry(urlParts[2]),
  };

  return new Response(await renderFile("task.eta", data), responseDetails);
};

const viewTasks = async (request) => {
  const data = {
    tasks: await taskService.findAllNonCompletedTasks(),
  };

  return new Response(await renderFile("tasks.eta", data), responseDetails);
};
const completeTask = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await taskService.completeById(urlParts[2]);
  
    return await requestUtils.redirectTo("/tasks");
  };

export { addTask, viewTask, viewTasks, completeTask };

