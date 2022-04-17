require("dotenv").config();
const port = process.env.PORT || 5000;

const app = require("./app");

// error handler
const error = require("./middleware/errorHandler");
app.use(error);

// db connect
require("./db/dbConnect")();

app.listen(port, () => {
  console.log(`server is up on ${port}`);
});
