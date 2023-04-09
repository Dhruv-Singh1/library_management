const Book= require("../models/books");
const db  = require("../config/db")
exports.getAllBooks= async (req,res,next)=>{
    try{
        let sql ="select * from `library_management`.`Book` natural join  `library_management`.`Author` group by ISBN";
        let res1= db.execute(sql);

        const [books,_]= await Book.findAll();
        res1.then((res1)=>{
            let sql3 =`select * from \`library_management\`.\`book_genre\` where BookTitle = '${res1[0][0]["Title"]}'`;
            let res3=db.execute(sql3);
            res2.then((res2)=>{
            let auth=[];
            res2=res2[0];
            console.log(res2);
            res2.forEach((ent)=>{auth.push(ent["Name"])})
            res1=res1[0][0];
            res1["Author"]=auth;
            res3.then((gen)=>{
            res1["Genre"]=gen[0][0]["Genre"];
            res.status(200).send(res1);  
            });
            } ); 
        } ); 
        res.status(200).json({count:books.length ,books});
    }catch(err){
        console.log(err);
        next(err);
    }

}


exports.createNewBook= async (req,res,next)=>{
    try{
    let { ISBN, Title, Edition,Publisher,Authors, Copies,Genre} =req.body;
    console.log(Publisher,Authors,Copies,Genre);
    let book = new Book(ISBN,Title,Edition,Publisher,Authors,Copies,Genre);
    book= await book.save();
    console.log(book);
    res.status(201).send({message:" Created new book"});   
   }catch(err){
    console.log(err);
    next(err);
    }
}


exports.getBookById= async (req,res,next)=>{
    try{
    let [res1,res2]=  Book.findById(req.params.id);
    
    res1.then((res1)=>{
        let sql3 =`select * from \`library_management\`.\`book_genre\` where BookTitle = '${res1[0][0]["Title"]}'`;
        let res3=db.execute(sql3);
        res2.then((res2)=>{
        let auth=[];
        res2=res2[0];
        console.log(res2);
        res2.forEach((ent)=>{auth.push(ent["Name"])})
        res1=res1[0][0];
        res1["Author"]=auth;
        res3.then((gen)=>{
        res1["Genre"]=gen[0][0]["Genre"];
        res.status(200).send(res1);  
        });
        } ); 
    } ); 
   }catch(err){
    console.log(err);
    next(err);
    }
}


exports.getBookByTitle= async (req,res,next)=>{
    try{
    let [book,_]=await Book.findByTitle(req.params.title);
    res.status(200).send({book});   
   }catch(err){
    console.log(err);
    next(err);
    }
}