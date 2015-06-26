import knex from "knex";

let db = knex({
    client: "sqlite3",
    connection: {
        filename: "./noobspike_database.sqlite"
    }
});

export default db;
