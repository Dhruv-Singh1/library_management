const Book= require("../models/books");

exports.getAllBooks= async (req,res,next)=>{
    try{
        const [books,_]= await Book.findAll();
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
    let [book,_]=await Book.findById(req.params.id);
    res.status(200).send({book});   
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