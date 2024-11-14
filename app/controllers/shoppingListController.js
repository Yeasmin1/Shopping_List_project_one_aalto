import { renderFile } from "https://deno.land/x/eta@v2.2.0/mod.ts";
import { deleteCookie, setCookie, getCookies } from "https://deno.land/std/http/cookie.ts";
import * as shoppingListService from "../services/shoppingListService.js";
import * as listEntryService from "../services/listEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";
/*
const responseDetails = {
 headers: { "Content-Type": "text/html;charset=UTF-8",}
};
*/

//
const headers = new Headers();
headers.append("Content-Type","text/html;charset=UTF-8");

const addList = async (request) => {
  const formData = await request.formData();
  const name = formData.get("name");
  await shoppingListService.create(name);
  return requestUtils.redirectTo("/lists");
};

/*
const viewLists = async (request) => {
  const data = {
    lists: await shoppingListService.findAllActiveLists(),
  };
  return new Response(await renderFile("lists.eta", data), responseDetails);
};
*/

const viewLists = async (request) => {
  const myCookies = getCookies(request.headers);
  if (myCookies.test == "value1" ) {
    const data = {
      lists: await shoppingListService.findAllActiveLists(),
      notice: "Welcome again",
      totalLists: await shoppingListService.allLists(),
      totalListItems:await listEntryService.allListItems(),
    };
    return new Response(await renderFile("lists.eta", data), {headers});
  }else{
    const data = {
      lists: await shoppingListService.findAllActiveLists(),
      notice: "Welcome first time",
      totalLists: await shoppingListService.allLists(),
      totalListItems:await listEntryService.allListItems(),
    };
    setCookie(headers, {name: "test", value : "value1"});
    return new Response(await renderFile("lists.eta", data), {headers});
  }
};

//show details of an individual list
const viewList = async (request) => {
  const url = new URL(request.url);
  const urlParts = url.pathname.split("/");
  const data = {
    list: await shoppingListService.findById(urlParts[2]),
    currentListEntry: await listEntryService.findCurrentListEntry(urlParts[2]),
  };
  return new Response(await renderFile("list.eta", data), {headers});
};

const completeList= async (request) => {
    const url = new URL(request.url);
    const urlParts = url.pathname.split("/");
    await shoppingListService.completeById(urlParts[2]);
    return await requestUtils.redirectTo("/lists");
  };

export { addList, viewLists,viewList,completeList};

