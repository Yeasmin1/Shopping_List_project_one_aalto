import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import * as shoppingListService from "../services/shoppingListService.js";
import * as requestUtils from "../utils/requestUtils.js";


const responseDetails = {
    headers: { "Content-Type": "text/html;charset=UTF-8" },
};

const addList = async (request) => {
    const formData = await request.formData();
    const name = formData.get("name");
     await shoppingListService.create("name");

     return requestUtils.redirectTo("/lists");
};

const viewLists = async (request) => {
    const data = {
        lists: await shoppingListService.findAllActiveLists(),
    };
    return new Response(await renderFile("lists.eta", data), responseDetails);
};

const viewList = async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");

    const data = {
        list: await 
    }
}

export {addList, viewLists};