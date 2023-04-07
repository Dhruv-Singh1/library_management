require('dotenv').config();
const mysql= require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST ,
    user:  process.env.DB_USER,
    databse:  process.env.DB_NAME,
    password: process.env.DB_PASSWORD, }
);
pool.execute("select * from `library_management`.`Book`",(err,res)=>{
    if(err) throw err;
    // res.forEach(element => {
    //     console.log(element.Title);
    // });
    // console.log(res);
});



module.exports= pool.promise();