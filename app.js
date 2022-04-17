const express = require("express");
const app = express();
const User = require("./models/users");

// cors
const cors = require("cors");
app.use(
  cors({
    origin: ["http://localhost:3000", "https://localhost:3000"],
    credentials: true,
  })
);

// morgan
const morgan = require("morgan");
app.use(morgan("tiny"));

// body parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cookie parser
const cookieParser = require("cookie-parser");
app.use(cookieParser());

// user routes
const userRoute = require("./routes/userRoutes");
app.use("/user", userRoute);

// book routes
const bookRoute = require("./routes/bookRoutes");
app.use("/book", bookRoute);

module.exports = app;
