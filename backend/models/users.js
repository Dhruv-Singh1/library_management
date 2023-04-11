const db  = require("../config/db")
const bcrypt = require('bcrypt');
class User{
    constructor(name,phoneno,email,pass,deptname,room,bhawan,homeaddress){
        this.name=name;
        this.phoneno=phoneno;
        this.email=email;
        this.pass=pass;
        this.deptname=deptname;
        this.bhawan=bhawan;
        this.room=room;
        this.homeaddress=homeaddress;
    }

    async save(){
    bcrypt.hash(this.pass, 10).then((encryptedUserPassword)=>{
       try{
        let id=this.email.slice(1, 9);
        console.log(encryptedUserPassword.length)
        console.log(this.deptname);
         let insertuser= `insert into \`library_management\`.\`user\` values (${id},'${this.name}',${this.phoneno},'${this.email}','${encryptedUserPassword}','${this.deptname}')`;
        db.execute(insertuser);
        console.log(this.bhawan +" "+this.room+" "+this.homeaddress);
        let useraddress= `insert into \`library_management\`.\`Address\` values (${id},'${this.bhawan}',${this.room},'${this.homeaddress}')`;
        db.execute(useraddress);
        }
       catch(err){
            console.log(err);
       }
    });
        
    }

    static findById(id){
        let sql =`select * from \`library_management\`.\`user\` where user.Email = '${id}'`;
        return db.execute(sql);
        
    }

}
module.exports=User;