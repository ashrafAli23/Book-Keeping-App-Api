const express = require("express");
const route = express.Router();
const {
  deleteUser,
  loginUser,
  registerUser,
  updateUser,
  getSingleUser,
} = require("../controller/user.controller");
const authentication = require("../middleware/authentication");

route.post("/register", registerUser);

route.post("/login", loginUser);

route.put("/:id", authentication, updateUser);

route.get("/:id", authentication, getSingleUser);

route.delete("/:id", authentication, deleteUser);

module.exports = route;
