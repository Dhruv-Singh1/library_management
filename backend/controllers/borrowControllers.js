const db  = require("../config/db")
exports.borrowBook= async (req,res,next)=>{
    try{
        let {book_id ,CardNo} =req.body; 
            let insertcirculation= `select * from   \`library_management\`.\`circulation\` where CardNo=${CardNo} and status='P'`;
             let set=`Set @res=""; `;
             db.execute(set).then((res0)=>{
               console.log(res0);
                let circulation=` CALL \`library_management\`.issuebook(${book_id},${CardNo},@res); `;
                db.execute(circulation).then((res1)=>{
                    let slect=` Set @res=""; `;
                    console.log(res1[0][0]);
                     db.execute(slect).then((result)=>{
                        // console.log(result);
                        res.status(200).send({"message":res1[0][0][0].res});   
                    });
                });

             });
         
    }catch(err){
        console.log(err);
        next(err);
    }

}

exports.returnBook= async (req,res,next)=>{
    try{
            let {loan_id,CardNo} =req.body; 
            let insertcirculation= `select * from   \`library_management\`.\`circulation\` where CardNo=${CardNo} and status='P'`;
            let circulation=`CALL \`library_management\`.returnbook(${loan_id},${CardNo}) `;
            await db.execute(circulation);
            let res1= db.execute(insertcirculation);
            db.execute()
            res1.then((res1)=>{
                res.status(200).send({message:" Returned a book",borrowed:res1[0]});   
            });
     
   }catch(err){
    console.log(err);
    next(err);
    }
}

exports.renewBook= async (req,res,next)=>{
    try{
            let {loan_id,CardNo} =req.body; 
            // let insertcirculation= `select * from   \`library_management\`.\`circulation\` where CardNo=${CardNo} and status='P'`;
            let circulation=`CALL \`library_management\`.renewbook(${loan_id},${CardNo}) `;
            await db.execute(circulation);
            let res1= db.execute(insertcirculation);
            db.execute()
            res1.then((res1)=>{
                res.status(200).send({message:" Renewd a book",borrowed:res1[0]});   
            });
     
   }catch(err){
    console.log(err);
    next(err);
    }
}


exports.getAllBorrowedBooks= async (req,res,next)=>{
    try{
    // let [book,_]=await Book.findById(req.params.id);
    res.status(200).send({book});   
   }catch(err){
    console.log(err);
    next(err);
    }
}