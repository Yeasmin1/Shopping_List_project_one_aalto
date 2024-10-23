//Creating a work entry

//Let's next add the functionality needed for creating a work entry. 
//We need a controller for handling the work entry -related requests. 
// In practice, the controller functionality needed for creating a work entry needs to 
//extract the id of the task from the path, call the function createWorkEntry from the 
//workEntryService.js, and then redirect the user to the current page.

import * as workEntryService from "../services/workEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createWorkEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await workEntryService.createWorkEntry(urlParts[2]);

  return requestUtils.redirectTo(`/tasks/${urlParts[2]}`);
};

const finishWorkEntry = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  await workEntryService.finishWorkEntry(urlParts[4]);

  return requestUtils.redirectTo(`/tasks/${urlParts[2]}`);
};

export { createWorkEntry, finishWorkEntry };