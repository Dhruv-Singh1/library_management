const db  = require("../config/db")
class Book{
    constructor(isbn,title,edition,publisher,authors,copies,genre){
        this.title=title;
        this.isbn=isbn;
        this.edition=edition;
        this.authors=authors;
        this.publisher=publisher;
        this.genre=genre;
        this.copies=copies
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
       try{ let insertbook= `insert into \`library_management\`.\`Book\` values (${this.isbn},'${this.title}',${this.edition},'${this.publisher}',${this.copies})`;

       await db.execute(insertbook);
        }
       catch(err){
            console.log(err);
       }
        this.authors.forEach(author => {
            
            if (typeof author !== 'undefined')
            {let insertAuthor= `insert into \`library_management\`.\`Author\`  values (${this.isbn},'${author}')`;
                db.execute(insertAuthor); console.log(author);}
            
        });        

    }

    static findAll(){
        let sql ="select * from `library_management`.`Book` natural join  `library_management`.`Author` group by ISBN";
        return db.execute(sql);
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