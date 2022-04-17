const express = require("express");
const route = express.Router();
const {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controller/book.controller");
const authentication = require("../middleware/authentication");

route.post("/", authentication, addBook);
route.get("/:page", getAllBooks);
route.put("/:id", authentication, updateBook);
route.delete("/:id", authentication, deleteBook);

module.exports = route;
