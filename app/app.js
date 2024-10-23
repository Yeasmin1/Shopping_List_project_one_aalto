import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as shoppingListController from "./controllers/shoppingListController.js";
import * as listEntryController from "./controllers/listEntryController.js";
import * as requestUtils from "./utils/requestUtils.js";

// Configure the views
configure({
  views: `${Deno.cwd()}/views/`,
});

// Main request handler
const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return requestUtils.redirectTo("/lists");
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await shoppingListController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await shoppingListController.viewLists(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "GET") {
    return await shoppingListController.viewList(request);
  } else if (url.pathname.match("lists/[0-9]+/entries/[0-9]+") && request.method === "POST") {
    return await listEntryController.finishListEntry(request);
  } else if (url.pathname.match("lists/[0-9]+/entries") && request.method === "POST") {
    return await listEntryController.createListEntry(request);
  } else if (url.pathname.match("lists/[0-9]+") && request.method === "POST") {
    return await shoppingListController.completeList(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

// Get the port from environment variables or default to 7777
const port = Deno.env.get("PORT") || 7777;

// Start the server, bind to 0.0.0.0 with the dynamic port
serve(handleRequest, { hostname: "0.0.0.0", port: Number(port) });
