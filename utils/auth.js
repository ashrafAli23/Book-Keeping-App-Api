const User = require("../models/users");
const validData = require("./validation");

// register users (user , admin)
const registerUsers = async (userData, roll) => {
  if (!validData(userData)) {
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
      throw new Error("this user already exists");
    } else {
      const user = await User.create({ ...userData, roll });
      const token = await user.generateToken();
      return {
        id: user._id,
        email: user.email,
        name: user.name,
        roll: user.roll,
        token,
      };
    }
  } else {
    throw new Error("invaild data");
  }
};

// login users (user,admin)
const loginUsers = async (userData) => {
  if (!validData(userData)) {
    const userExists = await User.findOne({
      email: userData.email,
    });
    const checkPass = await userExists.isMatch(userData.password);
    // check if exists
    if (userExists && checkPass) {
      const token = await userExists.generateToken();
      return {
        id: userExists._id,
        name: userExists.name,
        email: userExists.email,
        roll: userExists.roll,
        token,
      };
    }
    throw new Error("invalid email or password");
  } else throw new Error("invalid email or password");
};

module.exports = {
  registerUsers,
  loginUsers,
};
