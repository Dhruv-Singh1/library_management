const db  = require("../config/db")
class Book{
    constructor(isbn,title,edition,publisher,authors,copies,genre,price){
       
        this.isbn=isbn;
        this.title=title;
        this.edition=edition;
        this.authors=authors;
        this.publisher=publisher;
        this.genre=genre;
        this.copies=copies
        this.price=price
    }

    async save(){
        let d= new Date();
        let yyyy= d.getFullYear();
        let mm= d.getMonth()+1;
        let dd= d.getDate();
        let borrowedDate = `${yyyy}-${mm}-${dd}`

       try{ let insertgenre= `insert into \`library_management\`.\`book_genre\` values ('${this.title}','${this.genre}')`;
       await db.execute(insertgenre);
        }
       catch(err){
            console.log(err);
       }
       try{ let insertbook= `insert into \`library_management\`.\`Book\` values (${this.isbn},'${this.title}',${this.edition},'${this.publisher}',${this.copies},${this.price})`;

       let res1= db.execute(insertbook);
       res1.then((res11)=>{
        
       });

       this.authors.forEach(author => {
        var delayInMilliseconds = 5000; //1 second

       
            if (typeof author !== 'undefined')
            {let insertAuthor= `insert into \`library_management\`.\`Author\`  values (${this.isbn},'${author}')`;
                db.execute(insertAuthor); console.log(author);}
   
       
        
    });   
        }
       catch(err){
            console.log(err);
       }
     

    }

    static async findAll(){
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
            let sql3 =`select * from \`library_management\`.\`book_genre\` where BookTitle = '${title}'`;
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
               if(i==len){ return books;}
                // console.log( books);
                
                });
                } ); 
                
            });
           
            // return books;
            
        }); 
        
    }

    static findById(id){
        let sql =`select * from \`library_management\`.\`Book\` where isbn = ${id}`;
        let res1=  db.execute(sql);
        let sql2 =`select * from \`library_management\`.\`Author\` where isbn = ${id}`;
        let res2=db.execute(sql2);
        return [res1 ,res2] ;
    }

    static findByTitle(title){
        let sql =`select * from \`library_management\`.\`Book\` where Title like '%${title}%' `;
        return db.execute(sql);
        
    }
}
module.exports=Book;