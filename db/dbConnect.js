// db connect
const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => console.log("db connected"))
    .catch((err) => {
      console.log("db connect :", err.message);
      process.exit(1);
    });
};

const mongo = mongoose.connection;
mongo.on("open", (err) => {
  console.log("mongo open");
});
mongo.on("error", (err) => {
  console.log(`mongodb ${err}`);
});

module.exports = dbConnect;
