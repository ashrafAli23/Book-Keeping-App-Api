const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const util = require("util");
const jwt = require("jsonwebtoken");

const jwtSign = util.promisify(jwt.sign);
const jwtVerify = util.promisify(jwt.verify);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roll: {
      type: String,
      required: true,
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

// before saving data into db this function excute first
userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.log(`mongoose error pre save:  ${error}`);
    next(error);
  }
});

// check user password
userSchema.methods.isMatch = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// generate token
userSchema.methods.generateToken = function () {
  return jwtSign(
    { id: this._id, roll: this.roll, email: this.email, name: this.name },
    process.env.JWT_KEY,
    {
      expiresIn: "7d",
    }
  );
};

// verify token
userSchema.statics.getUserFromToken = async function (token) {
  const { id, email, roll } = await jwtVerify(token, process.env.JWT_KEY);
  const user = await this.findOne({ _id: id, email, roll });
  return user;
};

const User = mongoose.model("user", userSchema);

module.exports = User;
