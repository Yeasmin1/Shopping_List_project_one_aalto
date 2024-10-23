import {sql} from "../database/database.js";

const createListItem = async (shoppingListId) => {
    await sql `INSERT INTO shopping_list_items (shopping_list_id) VALUES (${shoppingListId}, NOW())`;

}

const findCurrentShoppingList = async (shoppingListId) => {
    const rows = await sql `SELECT * FROM shopping_list_items WHERE
    shopping_list_id = ${shoppingListId} AND  collected = false`

    if (rows && rows.length > 0){
        return rows[0];
    }
    return false;
}

const collecteditem = async (id) => {
    await sql `UPDATE  shopping_list_items
        SET collected = NOW() WHERE id =${id}`;
};

export {createListItem, findCurrentShoppingList, collecteditem}
