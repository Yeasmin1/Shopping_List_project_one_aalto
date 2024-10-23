import {sql} from "../database/database.js";


const create = async (name) => {
    await sql `INSERT INTO shopping_lists (name) VALUES (${name})`;
};

const findAllActiveLists = async () => {
    return await sql `SELECT * FROM shopping_lists WHERE active = true`;
};

const findById = async (id) => {
    const rows = await sql `SELECT * FROM 
        shopping_lists wHERE id = ${id}`;
        if (rows && rows.length > 0) {
            return rows[0];
        }
        return {id: 0, name: "unknown"}
}

export {create, findAllActiveLists, findById};

