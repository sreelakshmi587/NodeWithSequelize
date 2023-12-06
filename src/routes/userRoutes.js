const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");

router.post('/signup',userAuth.authenticateUser,userController.signUp);
router.post('/login', userController.login);


module.exports = router;

