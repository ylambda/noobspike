import db from "./database";
import Bookshelf from "bookshelf";

let bookshelf = Bookshelf(db);

let Video = bookshelf.Model.extend({
    tableName: 'videos'
});
