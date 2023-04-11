require('dotenv').config();
const mysql= require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST ,
    user:  process.env.DB_USER,
    databse:  process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    multipleStatements: true,
}
);
module.exports= pool.promise();