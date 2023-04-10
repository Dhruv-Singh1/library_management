const Book= require("../models/books");
const db  = require("../config/db")
exports.getAllBooks= async (req,res,next)=>{
    try{
        let sql ="select * from `library_management`.`Book`";
        let res1= db.execute(sql);
            let i=1;
        res1.then((books)=>{
            // console.log(book);
            
            books=books[0];
            const len = books.length;
            // console.log(books);
            books.forEach((book)=>{
            // console.log(book.Title);
            let title=book.Title;
            let isbn=book.ISBN;
            let sql2 =`select * from \`library_management\`.\`Author\` where isbn = ${isbn}`;
            let res2=db.execute(sql2);
            let sql3 =`select * from \`library_management\`.\`book_genre\` where BookTitle = "${title}"`;
            let res3=db.execute(sql3);
            res2.then((res2)=>{
                let authors=[];
                res2=res2[0];
                // console.log(res2);
                res2.forEach((ent)=>{authors.push(ent["Name"])})
                book["Author"]=authors;

                res3.then((gen)=>{
                book["Genre"]=gen[0][0]["Genre"];
               console.log(i++);
              
                console.log( books);
                if(i==len+1){  res.status(200).json({count:books.length,books  });}
                
                });
                } ); 
                
            });
            
        });
        // const books=  Book.findAll();
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
        console.log(res3);
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