const userBookService = require("../services/userBookService");
const constants = require("../../Utils/constants");

const addBookToUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const bookIds = req.body.bookIds;
    const addBooks = await userBookService.addBooksToUser(userId, bookIds);
    if (addBooks != null) {
      return res
        .status(201)
        .json({ message: constants.userBookAdded, userBook: addBooks });
    } else {
      return res.status(400).json({ message: constants.userBookExists });
    }
  } catch (error) {
    return res.status(500).json({ message: constants.internalServerError });
  }
};

const getUserWithAllBooks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const userAndBooks = await userBookService.getUserWithBooks(userId);

    if (userAndBooks && userAndBooks.Books.length > 0) {
      return res.status(200).json({
        message: constants.userBooksRetreived(userId),
        data: userAndBooks,
      });
    }

    return res
      .status(404)
      .json({ message: constants.userBookNotFound(userId) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: constants.internalServerError });
  }
};

const getBookWithAllUsers = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const bookAndUsers = await userBookService.getBookWithUsers(bookId);

    if (bookAndUsers && bookAndUsers.Users.length > 0) {
      return res.status(200).json({
        message: constants.getAllUsersByBookId(bookId),
        data: bookAndUsers,
      });
    }

    return res
      .status(404)
      .json({ message: constants.userNotFoundByBookId(bookId) });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: constants.internalServerError });
  }
};

const updateUserBookDetail = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;
    const bookData = req.body;

    const updatedUserBook = await userBookService.updateUserBook(
      userId,
      bookId,
      bookData
    );

    if (updatedUserBook) {
      res.status(200).json({
        message: constants.userBookUpdated,
        book: updatedUserBook,
      });
    } else {
      res.status(404).json({
        success: false,
        message: constants.userBookNotFound,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUserBooks = async (req, res) => {
  try {
    const userId = req.params.userId;
    const bookId = req.params.bookId;

    const deletedUserBook = await userBookService.removeUserBooks(
      userId,
      bookId
    );
    if (deletedUserBook) {
      res.status(200).json({
        message: constants.userBookDeleted,
      });
    } else {
      res.status(404).json({
        success: false,
        message: constants.userBookNotFound,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addBookToUser,
  getUserWithAllBooks,
  getBookWithAllUsers,
  updateUserBookDetail,
  deleteUserBooks,
};
