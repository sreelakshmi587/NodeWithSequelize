const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const userAuth = require("../middlewares/userAuth");


router.get("/get-books",userAuth.authenticateToken,bookController.getAllBooks);
router.get("/get-book/:id",userAuth.authenticateToken,bookController.getBookById);
router.post("/create-book",userAuth.authenticateToken,bookController.createBook);
router.put("/update-book/:id",userAuth.authenticateToken,bookController.updateBookDetail);
router.delete("/delete-book/:id",userAuth.authenticateToken,bookController.deleteBookDetail);


module.exports = router;