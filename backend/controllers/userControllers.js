const User= require("../models/users");
const bcrypt = require('bcrypt');

exports.createNewUser= async (req,res,next)=>{
    try{
    let {name,phoneno,email,pass,deptname,address} =req.body;
    let user = new User(name,phoneno,email,pass,deptname,address);
    user= await user.save();
    console.log(user);
    res.status(201).send({message:"new user registered"});   
   }catch(err){
    console.log(err);
    next(err);
    }
}


exports.getUserById= async (req,res,next)=>{
    try{
    let {email,pass} =req.body;
    let [user,_] = await User.findById(email);
        
        user=user[0];
        console.log(user["Password"]);
        const passwordMatch =  bcrypt.compareSync(pass,user["Password"]);
        if(passwordMatch)
        {res.status(200).send({user}); }
        else{
            res.status(401).send({"Error":"Invalid Credientials"});
        }
  
  
   }catch(err){
    console.log(err);
    next(err);
    }
}
  


exports.userLogin= async (req,res,next)=>{
    try{
    let [user,_]=await User.findById(req.params.id);

    res.status(200).send({user});   
   }catch(err){
    console.log(err);
    next(err);
    }
}