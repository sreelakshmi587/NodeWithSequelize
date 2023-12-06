const userService = require("../services/userService");
const constants = require("../../Utils/constants");

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userData = { name, email, password };

    const user = await userService.signUp(req, userData);
    console.log(user)
    if (user) {
      res.status(201).json({
        message: constants.userSignUp,
        user: user.user,
        token: user.token,
      });
    } else if (null) {
      res.status(401).json({
        success: false,
        message: constants.invalidCredential,
      });
    }
  } catch (error) {
    console.log(error)

    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loginUser = await userService.login(req, email, password);
    if (loginUser) {
      res.status(201).json({
        success: true,
        message: constants.successfulLogin,
        user: loginUser.user,
        token: loginUser.token,
      });
    } else {
      res.status(401).json({
        success: false,
        message: constants.invalidCredential,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { signUp, login };
