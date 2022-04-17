const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Book category required"],
    },
    auther: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const Books = mongoose.model("Book", bookSchema);

module.exports = Books;
