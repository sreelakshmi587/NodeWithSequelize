const db = require("../models");
const constants  =require("../../Utils/constants");

const User_Book = db.User_Book;
const User = db.User;
const Book = db.Book;

//Gets User and Book
const getUserAndBook = async (userId, bookId) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    const book = await Book.findOne({ where: { id: bookId } });
    return { user, book };
  } catch (error) {
    throw error;
  }
};

//Gets User by Id
const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(constants.userNotFound);
    }
    return user;
  } catch (error) {
    throw error;
  }
};

//Fetches all books of a user
const getUserWithBooks = async (userId) => {
  try {
    const userAndBooks = await User.findOne({
      where: { id: userId },
      include: [{ model: Book }],
    });
    return userAndBooks;
  } catch (error) {
    throw error;
  }
};

//Add books to a user
const addBooksToUser = async (userId, bookIds) => {
  try {
    const user = await getUserById(userId);
    const existingBooks = await user.getBooks();

    const newBookIds = bookIds.filter(
      (bookId) => !existingBooks.some((book) => book.id === bookId)
    );

    const newBooks = await Book.findAll({
      where: {
        id: newBookIds,
      },
    });

    const addedBooks = await user.addBooks(newBooks);

    return addedBooks;
  } catch (error) {
    throw error;
  }
};

//Update books of a user
const updateUserBook = async (userId, bookId, bookData) => {
  try {
    const [rowsUpdated, updatedUserBook] = await User_Book.update(bookData, {
      where: { userId, bookId },
      returning: true,
    });
    const user = await User_Book.findOne({ where: { userId, bookId } });

    console.log(updatedUserBook);
    return updatedUserBook;
  } catch (error) {
    throw error;
  }
};

//Remove books from user
const removeUserBooks = async (userId, bookId) => {
  try {
    const deletedBook = await User_Book.destroy({ where: { userId, bookId } });
    if (deletedBook) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};

//Fetches all users of a particular book
const getBookWithUsers = async (bookId) => {
  try {
    const bookAndUsers = await Book.findOne({
      where: { id: bookId },
      include: [{ model: User }],
    });
    return bookAndUsers;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserAndBook,
  addBooksToUser,
  getUserWithBooks,
  getBookWithUsers,
  updateUserBook,
  removeUserBooks,
};
