const User= require("../models/users");

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
    let [user,_]=await User.findById(req.params.id);

    res.status(200).send({user});   
   }catch(err){
    console.log(err);
    next(err);
    }
}

