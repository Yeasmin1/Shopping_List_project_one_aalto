import * as listEntryService from "../services/listEntryService.js";
import * as requestUtils from "../utils/requestUtils.js";

const createListEntry = async (request) => {
  const url = new URL(request.url);
  const formData = await request.formData();
  const itemName = formData.get("itemName");
  const urlParts = url.pathname.split("/");
  await listEntryService.createListEntry(urlParts[2], itemName);
  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
}

const markCollectItem = async(request) => {
  const url = new URL (request.url);
  const urlParts = url.pathname.split("/");
  await listEntryService.markCollectItem(urlParts[4]);
  return requestUtils.redirectTo(`/lists/${urlParts[2]}`);
}

export {createListEntry, markCollectItem};