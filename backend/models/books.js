const db  = require("../config/db")
class Book{
    constructor(isbn,title,edition,author,publisher,genre,copies){
        this.title=title;
        this.isbn=isbn;
        this.edition=edition;
        this.author=author;
        this.publisher=publisher;
        this.genre=genre;
    }

    async save(){
        let d= new Date();
        let yyyy= d.getFullYear();
        let mm= d.getMonth()+1;
        let dd= d.getDate();

        let borrowedDate = `${yyyy}-${mm}-${dd}`
        // ISBN,Title,Edition,Publisher, AuthorID ,Copies 
        let insertAuthor= `insert into \`library_management\`.\`Author\` (Name) values ('${this.author}')`;
        
        const [newAuthor,_] = await db.execute(insertAuthor);
        
        let sql= `insert into \`library_management\`.\`Book\` values (
            ${this.isbn},
            '${this.title}',
            ${this.edition},
            '${this.publisher}',
            ${this.copies}
        )`;
    }
    static findAll(){
        let sql ="select * from `library_management`.`Book`";
        return db.execute(sql);
    }
    static findById(id){
        let sql =`select * from \`library_management\`.\`Book\` where isbn = ${id}`;
        return db.execute(sql);
    }
}
module.exports=Book;