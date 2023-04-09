// const db  = require("../config/db")
// class Borrow{
    
//     constructor(loan_id ,book_id ,CardNo ){
//         this.book_id=book_id;
//         this.CardNo=CardNo;
//     }

//     async save(){
//         let d= new Date();
//         let yyyy= d.getFullYear();
//         let mm= d.getMonth()+1;
//         let dd= d.getDate();

//         let borrowedDate = `${yyyy}-${mm}-${dd}`
//         var dueDate = new Date(borrowedDate);
//         dueDate.setDate(result.getDate() + 7);

       
        

//         this.authors.forEach(author => {
            
//             if (typeof author !== 'undefined')
//             {let insertAuthor= `insert into \`library_management\`.\`Author\`  values (${this.isbn},'${author}')`;
//                 db.execute(insertAuthor); console.log(author);}
            
//         });        

//     }

//     static findAll(){
//         let sql ="select * from `library_management`.`Book` natural join `library_management`.`book_genre` natural join `library_management`.`Author`";
//         return db.execute(sql);
//     }

//     static findById(id){
//         let sql =`select * from \`library_management\`.\`circulation\` where isbn = ${id}`;
//         return db.execute(sql);
//     }

//     static findByTitle(title){
//         let sql =`select * from \`library_management\`.\`circulation\` where Title like '%${title}%' `;
//         return db.execute(sql);
//     }
// }
// module.exports=Book;