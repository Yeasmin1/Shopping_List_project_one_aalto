import { serve } from "./deps.js";
import { configure } from "./deps.js";
import * as shoppingListController from "./controllers/shoppingListController.js";
import * as shoppingListItemController from "./controllers/shoppingListItemController.js";
import * as requestUtils from "./utils/requestUtils.js";

configure({
    views: `${Deno.cwd()}/views/`,
});

const handleRequest = async (request) => {
    const url = new URL(request.url);

    if (url.pathname ==="/" && request.method === "GET"){
        return requestUtils.redirectTo("/lists");
    }
    else if (url.pathname === "/lists" && request.method === "POST"){
        return await shoppingListController.addList(request);
    }
    else if(url.pathname === "/lists" && request.method === GET){
        return shoppingListController.viewLists(request);
    }
    
}