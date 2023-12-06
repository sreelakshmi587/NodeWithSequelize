const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const constants = require("./Utils/constants");
const db = require("./src/models");
const userRoutes = require("./src/routes/userRoutes");
const bookRoutes = require("./src/routes/bookRoutes");
const userBookRoutes = require("./src/routes/userBookRoutes");


const PORT = process.env.PORT || 3000 ;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('/user',userRoutes);
app.use('/book',bookRoutes);
app.use('/userBook',userBookRoutes);



db.sequelize.sync({alter:true}).then(()=>console.log(constants.dbSync));

app.listen(PORT,()=>{
    console.log(constants.serverConnected(PORT));
})