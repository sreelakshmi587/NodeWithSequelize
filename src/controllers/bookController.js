const bookService = require("../services/bookService");
const constants = require("../../Utils/constants");

const getAllBooks = async (req, res) => {
  const allBooks = await bookService.getBooks();
  if (allBooks) {
    return res
      .status(200)
      .json({ message: constants.booksRetreived, books: allBooks });
  }
  return res.status(404).json({ message: constants.bookNotFound });
};

const getBookById = async (req, res) => {
  const id = req.params.id;
  const book = await bookService.findBookById(id);
  if (book) {
    return res
      .status(200)
      .json({ message: constants.getBookById(id), book: book });
  }
  return res.status(404).json({ message: constants.bookNotFound });
};

const createBook = async (req, res) => {
  try {
    const { title, description } = req.body;
    const data = { title, description };

    const existingBook = await bookService.findBookByTitle(title);

    if (existingBook) {
      res.status(401).json({
        success: false,
        message: constants.bookExists,
      });
    } else {
      const newBook = await bookService.createBookIfNotExists(req, data);
      if (newBook) {
        res.status(201).json({
          message: constants.bookCreated,
          book: newBook,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateBookDetail = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = req.body;

    const updatedBook = await bookService.updateBook(bookId, book);

    if (updatedBook) {
      return res.status(200).json({
        message: constants.bookUpdated,
        book: updatedBook,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: constants.bookNotFound,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const deleteBookDetail = async (req, res) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await bookService.deleteBook(bookId);

    if (deletedBook) {
      return res.status(200).json({
        message: constants.bookDeleted,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: constants.bookNotFound,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookDetail,
  deleteBookDetail,
};
