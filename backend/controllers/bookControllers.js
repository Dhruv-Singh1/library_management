const Book= require("../models/books");

exports.getAllBooks= async (req,res,next)=>{
    try{
        const [books,_]= await Book.findAll();
        res.status(200).json({count:books.length ,books});
    }catch(err){
        console.log(err);
        next(err);
    }
 res.send(" All books sent n...");   
}


exports.createNewBook= async (req,res,next)=>{
    try{
    let { isbn, title, edition,publisher,author,copies} =req.body;
    let book = new Book(isbn,title,edition,publisher,author,copies);
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
    let [book,_]=await Book.findById(req.params.id);
    res.status(200).send({book});   
   }catch(err){
    console.log(err);
    next(err);
    }
}