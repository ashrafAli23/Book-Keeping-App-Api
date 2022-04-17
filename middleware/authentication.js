const User = require("../models/users");

const authentication = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new Error("authorization required");
    // req.user => to pass it to next middleware
    req.user = await User.getUserFromToken(authorization);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
