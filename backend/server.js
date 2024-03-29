require("dotenv").config();
const express= require("express");
const app = express();
const cors = require('cors');

app.use(cors({
    origin: '*'
}));
app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}))

//Middleware
app.use(express.json());//parse json bodiesin the request object

app.use("/books",require("./routes/postBooks"));
app.use("/user",require("./routes/postUsers"));
app.use("/borrow",require("./routes/postBorrow"));

app.use((err,req,res,next)=>{
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({"message":"something went wrong"});
});

//listen on pc port
const PORT= process.env.PORT || 8000;
app.listen(PORT,()=>console.log(`Server is running at port ${PORT}`));

