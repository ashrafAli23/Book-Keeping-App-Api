const User = require("../models/users");
const { registerUsers, loginUsers } = require("../utils/auth");

const registerUser = async (req, res, next) => {
  try {
    const userData = await registerUsers(req.body, "user");

    res.status(200).send(userData);
  } catch (error) {
    next(error);
  }
};

// login user
const loginUser = async (req, res, next) => {
  try {
    const userData = await loginUsers(req.body);
    res.status(200).send(userData);
  } catch (error) {
    next(error);
  }
};

const getSingleUser = async (req, res, next) => {
  try {
    const { _id, name, email } = await req.user;
    res.status(200).send({ _id, name, email });
  } catch (error) {
    next(error);
  }
};

const updateUser = (req, res) => {
  res.send("update succes");
};

const deleteUser = (req, res) => {
  res.send("deleted succes");
};

module.exports = {
  loginUser,
  registerUser,
  updateUser,
  deleteUser,
  getSingleUser,
};
