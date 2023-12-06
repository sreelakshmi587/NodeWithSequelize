const express = require("express");
const db = require("../models");
const jwt = require('jsonwebtoken');
const constants = require("../../Utils/constants");

const User = db.User;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [bearer, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ message: constants.unAuthorizedToken});
  }
  jwt.verify(token, process.env.secretKey, (err, user) => {
    if (err) {
      console.log(token);
      return res.status(403).json({ message: constants.invalidToken});
    }

    req.user = user;
    console.log(user);

    next();
  });
};

const authenticateUser = async (req, res, next) => {
  try {
    const name = await User.findOne({
      where: {
        name: req.body.name,
      },
    });

    if (name) {
      return res.status(409).json(constants.userExists);
    }

    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailCheck) {
      return res.status(409).json(constants.emailExists);
    }

    next();

  } catch (error) {
    res.status(500).json(constants.internalServerError);
  }
};

module.exports ={authenticateUser,authenticateToken};
