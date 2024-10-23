//Creating a list item

//Let's next add the functionality needed for creating a list item. 
//We need a controller for handling the list item -related requests. 
// In practice, the controller functionality needed for creating a list item needs to 
//extract the id of the list  from the path, call the function createWorkEntry from the 
//workEntryService.js, and then redirect the user to the current page.

import * as listEntryService from "../services/listEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createListEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listEntryService.createListEntry(urlParts[2]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

const finishListEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await listEntryService.finishListEntry(urlParts[4]);

  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
};

export { createListEntry, finishListEntry };