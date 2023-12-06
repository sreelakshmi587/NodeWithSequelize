const { Sequelize,DataTypes } = require("sequelize");
const constants = require("../../Utils/constants");
const dotenv = require("dotenv").config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PWSD, {
    host: process.env.DB_HOST,
    dialect: `postgres`
});

sequelize.authenticate().then(() => console.log(constants.dbConnected)).catch((err) => {
    console.log(err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user') (sequelize, DataTypes);
db.Book = require('./book') (sequelize, DataTypes)
db.User_Book = require('./user_book') (sequelize, DataTypes)

db.User.belongsToMany(db.Book, { through: db.User_Book ,foreignKey: 'userId'});
db.Book.belongsToMany(db.User, { through: db.User_Book,foreignKey: 'bookId' });


module.exports = db;
