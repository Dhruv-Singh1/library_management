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
            console.log(CardNo);
            // let insertcirculation= `select * from   \`library_management\`.\`circulation\` where CardNo=${CardNo} and status='P'`;
            let circulation=`CALL \`library_management\`.returnbook(${loan_id},${CardNo}) `;
            let res1= db.execute(circulation);
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
            let circulation=`Select \`library_management\`.renewbook(${loan_id},${CardNo}) `;
            
            let res1=  db.execute(circulation);
            // db.execute()
            res1.then((res1)=>{
                res.status(200).send({message:" Renewd a book",borrowed:res1[0]});   
            });
     
   }catch(err){
    console.log(err);
    next(err);
    }
}


exports.sendbooks= async (req,resp,next)=>{
    try{
    let CardNo= req.params.id;
    console.log("sending issued books");
    let book= db.execute(`select * from   \`library_management\`.\`circulation\` inner join  \`library_management\`.\`Book\` on circulation.book_id=Book.ISBN  where CardNo=${CardNo} and status='P'`);
    book.then((res)=>{
       console.log(res[0])
       resp.status(200).send(res[0]);  
    });
   
   }catch(err){
    console.log(err);
    next(err);
    }
}


exports.sendAllIssued= async (req,resp,next)=>{
    try{
    let CardNo= req.params.id;
    console.log("sending issued books");
    let book= db.execute(`select   ISBN,Title , User.CardNo,Name, loan_date, due_date from \`library_management\`.\`circulation\` inner join  \`library_management\`.\`Book\` on circulation.book_id=Book.ISBN  inner join   \`library_management\`.\`User\` on (circulation.CardNo=User.CardNo ) where  status='P'`);

    book.then((res)=>{
       console.log(res[0])
       resp.status(200).send(res[0]);  
    });
   
   }catch(err){
    console.log(err);
    next(err);
    }
}

exports.sendFines= async (req,resp,next)=>{
    try{
    let CardNo= req.params.id;
    console.log("sending issued books");
    let book= db.execute(`select  Circulation.loan_id ,Book.ISBN,Book.Title,Book.Edition,Circulation.due_date ,Circulation.returned_date, fine.charges, fine.reason from \`library_management\`.\`Book\` inner join \`library_management\`.\`Circulation\` on \`library_management\`.\`Book\`.ISBN=\`library_management\`.\`circulation\`.book_id inner join \`library_management\`.\`fine\` on ( \`library_management\`.\`circulation\`.CardNo=\`library_management\`.\`fine\`.CardNo and \`library_management\`.\`circulation\`.loan_id= \`library_management\`.\`fine\`.circulation_id) where Circulation.CardNo=${CardNo}`); 
    book.then((res)=>{
        db.execute(`select User.cardno, User.Name  , sum(fine.charges) as Total_Fine from \`library_management\`.\`User\` natural join \`library_management\`.\`fine\` where cardno=${CardNo} group by cardno`).then((res2)=>{
            console.log(res2[0][0])
            console.log(res[0])
            resp.status(200).send({"totalfine":res2[0][0],"books":res[0]});  
        });

    });
   
   }catch(err){
    console.log(err);
    next(err);
    }
}