const express = require("express");
const router = express.Router();
const userBookController = require("../controllers/userBookController");
const user = require("../models/user");
const userAuth = require("../middlewares/userAuth");

router.post("/add-book-to-user",userAuth.authenticateToken,userBookController.addBookToUser);
router.get("/get-all-books-of-user/:userId",userAuth.authenticateToken,userBookController.getUserWithAllBooks);
router.get("/get-all-users-of-book/:bookId",userAuth.authenticateToken,userBookController.getBookWithAllUsers);
router.put("/update-userbooks/:userId/:bookId",userAuth.authenticateToken,userBookController.updateUserBookDetail);
router.delete("/delete-userbooks/:userId/:bookId",userAuth.authenticateToken,userBookController.deleteUserBooks);


module.exports = router;

