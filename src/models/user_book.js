const { DataTypes,UUIDV4} = require("sequelize");

module.exports = (sequelize, DataTypes)=>{
    const User_Book = sequelize.define('User_Book', {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        }
      }, { timestamps: true });
    
      return User_Book;
};


