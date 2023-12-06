const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models");

const User = db.User;

const signUp = async (req, userData) => {
  try {
    const { name, email, password } = userData;
    const data = {
      name,
      email,
      password: await bcrypt.hash(password, 10),
    };

    const user = await User.create(data);

    if (user) {
      
      return { user };
    }
  } catch (error) {
    throw error;
  }
};

const login = async (req, email, password) => {
    try {
      const user = await User.findOne({
        where: {
          email: email,
        },
      });
  
      if (user) {
        const isSamePswd = await bcrypt.compare(password, user.password);
  
        if (isSamePswd) {
          let token = jwt.sign({ id: user.id }, process.env.secretKey, {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          });
  
          return { user, token };
        } else {
          return null;
        }
      
      }
  
      return null;
    } catch (error) {
      throw error;
    }
  };
  

module.exports = { signUp ,login};
