var http = require('http');
require("dotenv").config();
const express= require("express");
const app = express();

//Middleware
app.use(express.json());//parse json bodiesin the request  object

app.use("/books",require("./routes/postBooks"));

app.use((err,req,res,next)=>{
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({"message":"something went wrong"});

});

//listen on pc port
const PORT= process.env.PORT || 8080;
app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`));

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);