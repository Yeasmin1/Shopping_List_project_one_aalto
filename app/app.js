import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as taskController from "./controllers/taskController.js";
import * as workEntryController from "./controllers/workEntryController.js";
import * as requestUtils from "./utils/requestUtils.js";

// Configure the views
configure({
  views: `${Deno.cwd()}/views/`,
});

// Main request handler
const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return requestUtils.redirectTo("/tasks");
  } else if (url.pathname === "/tasks" && request.method === "POST") {
    return await taskController.addTask(request);
  } else if (url.pathname === "/tasks" && request.method === "GET") {
    return await taskController.viewTasks(request);
  } else if (url.pathname.match("tasks/[0-9]+") && request.method === "GET") {
    return await taskController.viewTask(request);
  } else if (url.pathname.match("tasks/[0-9]+/entries/[0-9]+") && request.method === "POST") {
    return await workEntryController.finishWorkEntry(request);
  } else if (url.pathname.match("tasks/[0-9]+/entries") && request.method === "POST") {
    return await workEntryController.createWorkEntry(request);
  } else if (url.pathname.match("tasks/[0-9]+") && request.method === "POST") {
    return await taskController.completeTask(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

// Get the port from environment variables or default to 7777
const port = Deno.env.get("PORT") || 7777;

// Start the server, bind to 0.0.0.0 with the dynamic port
serve(handleRequest, { hostname: "0.0.0.0", port: Number(port) });
