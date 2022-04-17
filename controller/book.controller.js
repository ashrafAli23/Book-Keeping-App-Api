const Books = require("../models/books");
const validata = require("../utils/validation");

const getAllBooks = async (req, res, next) => {
  const page = parseInt(req.params.page);
  try {
    const book = await Books.find(
      {},
      { _id: 1, category: 1, auther: 1, title: 1 }
    )
      .limit(10)
      .skip(page * 10);

    if (book) {
      return res.status(200).send(book);
    }
    throw new Error("books not found");
  } catch (error) {
    next(error);
  }
};

const addBook = async (req, res, next) => {
  try {
    if (!validata(req.body)) {
      const book = await Books.create(req.body);
      if (book) {
        return res.status(200).send({ message: "book add succes" });
      }
    }
    res.status(401);
    throw new Error("book added failed");
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    if (req.params.id && !validata(req.body)) {
      const findBook = await Books.findById({ _id: req.params.id });
      if (findBook) {
        const updateBookById = await Books.findByIdAndUpdate(
          { _id: req.params.id },
          req.body,
          {
            new: true,
            runValidators: true,
          }
        );
        return res.status(200).send(updateBookById);
      }
    }
    throw new Error("updated failed");
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    if (req.params.id) {
      await Books.findByIdAndDelete({ _id: req.params.id });
      return res.status(200).send({ message: "book deleted succes" });
    }
    throw new Error("deleted failed");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
};
