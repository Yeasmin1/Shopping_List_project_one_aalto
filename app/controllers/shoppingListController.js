// Two controller functions are needed for the current functionality. The first one is responsible for showing the page with current tasks, and the other
// is responsible for adding a task. Let's call these functions viewTasks and addTask.


// added view task function : Now, we can implement the functionality needed 
//for showing a specific task. We call the function viewTask. The function will 
//extract the id of the specific task from the url, and use that id to retrieve a 
//task using the findById function from taskService.js. In addition, viewTask will 
//also use the findCurrentWorkEntry function from workEntryService.js for retrieving 
//the current work entry.

import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shoppingListService from "../services/shoppingListService.js";
import * as listEntryService from "../services/listEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const responseDetails = {
  headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await shoppingListService.create(name);
  return requestUtils.redirectTo("/lists");
};

const viewLists = async (request) => {
  const data = {
    lists: await shoppingListService.findAllActiveLists(),
  };
  return new Response(await renderFile("lists.eta", data), responseDetails);
};

//show details of an individual list
const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const data = {
    list: await shoppingListService.findById(urlParts[2]),
    currentListEntry: await listEntryService.findCurrentListEntry(urlParts[2]),
  };
  console.log("checking entry",data.currentListEntry)

  return new Response(await renderFile("list.eta", data), responseDetails);
};

const completeList= async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingListService.completeById(urlParts[2]);
    return await requestUtils.redirectTo("/lists");
  };

export { addList, viewLists,viewList,completeList};

