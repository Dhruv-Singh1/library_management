	create table `library_management`.`book_genre`
	(
    BookTitle	varchar(45) primary key,
	Genre	varchar(45) not null
    );
    
    create table `library_management`.`Book`
	(ISBN	decimal(13,0)  primary key ,
	 Title	varchar(45) not null ,
     Edition int unsigned not null,
	 Publisher varchar(45),
     Copies int unsigned not null ,
     price float not null,
	 CONSTRAINT valid_ISBN CHECK ( length(ISBN) = 13),
	CONSTRAINT fk_genre_book FOREIGN KEY (Title) REFERENCES `library_management`.`book_genre`(BookTitle) on delete  cascade,
    CONSTRAINT book_edn UNIQUE (Title,Edition)
	);
    
    create table `library_management`.`Author`		
	(ISBN	decimal(13,0) ,
	 Name varchar(45) not null,
	foreign key (ISBN) references `library_management`.`Book` (`ISBN`) on delete cascade,
    CONSTRAINT book_auth UNIQUE (ISBN,Name)
	);
    
    
   create table `library_management`.`Department`
    (
    DeptName varchar(45) primary key,
    HallNumber varchar (2)

    );
    
    create table `library_management`.`User`
	(CardNo		int primary key AUTO_INCREMENT ,
	 Name	varchar(45) not null,
     PhoneNumber decimal(10,0)  not null,
	 Email varchar(45) ,
     Password varchar(60) not null,
     DeptName varchar(45)  NOT NULL ,
	 foreign key (DeptName) references `library_management`.`Department`(DeptName) on delete  cascade
	);
    
    
    
  create table `library_management`.`Deptbooks`
    (
    DeptName varchar(45) ,
	TextBookID decimal(13,0) ,
    foreign key (DeptName) references `library_management`.`Department`(DeptName) on delete  cascade,
	foreign key (TextBookID) references `library_management`.`Book`(ISBN) on delete  cascade
    );
    
	create table `library_management`.`Address`
	(CardNo int not null ,
    Hostel varchar(10) not null,
    RoomNo decimal(4) not null,
    home_address varchar (45),
    foreign key (CardNo) references `library_management`.`User`(CardNo)
    );
    
    create table `library_management`.`circulation`
    (
    loan_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id decimal(13,0)  NOT NULL,
	CardNo INT NOT NULL,
	loan_date DATE NOT NULL,
	due_date DATE NOT NULL,
	returned_date DATE,
    status varchar(1) NOT NULL,
    CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES `library_management`.`Book`(ISBN),
	CONSTRAINT fk_user FOREIGN KEY (CardNo) REFERENCES `library_management`.`User`(CardNo)
    );
	
    create table `library_management`.`fine`
	(
    CardNo INT NOT NULL,
    charges float(4,2),
    circulation_id INT,
    reason varchar(45),
    FOREIGN KEY (circulation_id) REFERENCES `library_management`.`circulation`(loan_id),
    CONSTRAINT pos_fine check (charges>0) ,
    CONSTRAINT fk_usr_fine FOREIGN KEY (CardNo) REFERENCES `library_management`.`User`(CardNo)
    );
    

    


insert into `library_management`.`book_genre` values  ("Pride and Prejudice","Fiction");
insert into `library_management`.`book_genre` values  ("To Kill a Mockingbird","Fiction");
insert into `library_management`.`book_genre` values  ("The Great Gatsby","Fiction");

-- ISBN,Title,Edition,Publisher,Copies 
insert into `library_management`.`Book` values (1234567890123,"Pride and Prejudice" ,1 ,"Penguin Classics",3 );
insert into `library_management`.`Book` values (1234567890124,"To Kill a Mockingbird" ,1 ,"HarperCollins",4 );
insert into `library_management`.`Book` values (1234567890125,"The Great Gatsby"  ,1 ,"Scribner",3 );
insert into `library_management`.`Book` values (1234567890126,"The Great Gatsby"  ,2 ,"Scribner",3 );
select * from book;

insert into `library_management`.`Author` values (1234567890123,"Jane Austen");
insert into `library_management`.`Author` values  (1234567890124,"Harper Lee");
insert into `library_management`.`Author` values  (1234567890126," F. Scott Fitzgerald ");
-- select * from Book  Book.ISBN=Author.ISBN;
select * from Author;

select * from book_genre;
delete from author where ISBN = 9780078022159;

-- CardNo Name PhoneNumber Email  Password    DeptName
insert into `library_management`.`Department` values("Computer Science","1A");
insert into `library_management`.`Department` values("Electronics","1B");
insert into `library_management`.`Department` values("Mechanical","2A");
insert into `library_management`.`Department` values("Civil","2B");
insert into `library_management`.`Department` values("Chemical","2B");
select * from department;
insert into `library_management`.`User` values(20200969,"Dhruv Singh",1234567890,"f20200969@pilani.bits-pialni.ac.in","pass","Computer Science");

insert into `library_management`.`circulation`(book_id,CardNo ,loan_date ,due_date,status ) values(1234567890126,20200969,"2023-04-08","2023-04-15","P");
update Book set Copies =3 where ISBN  ;
select * from circulation;
delete from  circulation where loan_id=1;


DELIMITER $$;
CREATE DEFINER=`root`@`localhost` PROCEDURE `returnbook`(IN loan_id int, IN cardno int)
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
Declare duedate date ;
Declare fine float ;
Start transaction;
set duedate=(select due_date from `library_management`.`circulation` where circulation.loan_id=loan_id);
update `library_management`.`circulation` set circulation.returned_date=curdate() and circulation.status="R" where circulation.loan_id=loan_id;
if curdate()>   duedate then
		set fine=(DATEDIFF(arrival, departure)*5);
		insert into `library_management`.`fine`  values(cardno,fine,loan_id,"Late return");
        Commit;
        
END IF;
End
DELIMITER ;

insert into `library_management`.`circulation`(book_id,CardNo ,loan_date ,due_date,status) values(1234567890126,20200969,"2023-04-01","2023-04-06","P");
CALL issuebook(1234567890126,20200969) ;
CALL returnbook(44,2020111) ;

select * from Circulation;
select * from fine;
select * from Book;
delete  from circulation;

insert into `library_management`.`fine`  values(20200969,10,40,"Late return");
-- All checked out books from library
select  Book.ISBN,Book.ISBN,Book.Edition,Book.Publisher ,Book.Copies as Copies_Availabe , count(Book.ISBN) as Lended_Copies from Book inner join Circulation on Book.ISBN=Circulation.book_id where Book.ISBN group by Book.ISBN;
-- Total Fine for User
select User.cardno, User.Name  , sum(fine.charges) as Total_Fine from User natural join fine where cardno=20200969 group by cardno;
-- All checked out by user

-- all fined borrows of the user   
select  Circulation.loan_id ,Book.ISBN,Book.Title,Book.Edition,Circulation.due_date ,Circulation.returned_date,fine.charges,fine.reason from Book inner join Circulation on Book.ISBN=circulation.book_id inner join fine on (circulation.CardNo=fine.CardNo and circulation.loan_id=fine.circulation_id) where Circulation.CardNo=20200969  ;

alter table user modify Password varchar(60) not null;

select * from user;
delete from user where CardNo =20200111;


    