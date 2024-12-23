import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as shoppingListController from "./controllers/shoppingListController.js";
import * as listEntryController from "./controllers/listEntryController.js";
import * as requestUtils from "./utils/requestUtils.js";

configure({
  views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
  const url = new URL(request.url);

  if (url.pathname === "/" && request.method === "GET") {
    return requestUtils.redirectTo("/lists");
  } else if (url.pathname === "/lists" && request.method === "POST") {
    return await shoppingListController.addList(request);
  } else if (url.pathname === "/lists" && request.method === "GET") {
    return await shoppingListController.viewLists(request);
  } else if (url.pathname.match ("lists/[0-9]+/items/[0-9]+/collect") && request.method === "POST") {
  return await listEntryController.markCollectItem(request);
  } else if (url.pathname.match("lists/[0-9]+" )&& request.method === "GET") {
    return await shoppingListController.viewList(request);
  } else if (url.pathname.match ("lists/[0-9]+/items") && request.method === "POST") {
    return await listEntryController.createListEntry(request);
  } else if (url.pathname.match ("lists/[0-9]+") && request.method === "POST") {
    return await shoppingListController.completeList(request);
  } else {
    return new Response("Not found", { status: 404 });
  }
};

const port = Deno.env.get("PORT") || 7777;
serve(handleRequest, { hostname: "0.0.0.0", port: Number(port) });
