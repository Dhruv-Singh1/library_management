const db  = require("../config/db")
const bcrypt = require('bcrypt');
class User{
    constructor(name,phoneno,email,pass,deptname,address){
        this.name=name;
        this.phoneno=phoneno;
        this.email=email;
        this.pass=pass;
        this.deptname=deptname;
        this.address=address;
    }

    async save(){
    bcrypt.hash(this.pass, 10).then((encryptedUserPassword)=>{
       try{
        let id=this.email.slice(1, 9);
        console.log(encryptedUserPassword.length)
         let insertuser= `insert into \`library_management\`.\`user\` values (${id},'${this.name}',${this.phoneno},'${this.email}','${encryptedUserPassword}','${this.deptname}')`;
        db.execute(insertuser);
        }
       catch(err){
            console.log(err);
       }
    });
        
    }

    static findById(id){
        let sql =`select * from \`library_management\`.\`user\` where cardno = ${id}`;
        return db.execute(sql);
    }

}
module.exports=User;