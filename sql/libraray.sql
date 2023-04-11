	-- Book's genre table
    create table `library_management`.`book_genre`
	(
    BookTitle	varchar(45) primary key,
	Genre	varchar(45) not null
    );
    
-- Book table    
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
    
    
-- Book's Author table     
    create table `library_management`.`Author`		
	(ISBN	decimal(13,0) ,
	 Name varchar(45) not null,
	foreign key (ISBN) references `library_management`.`Book` (`ISBN`) on delete cascade,
    CONSTRAINT book_auth UNIQUE (ISBN,Name),
    CONSTRAINT valid_bookid CHECK ( length(ISBN) = 13)
	);
    
-- Department table    
   create table `library_management`.`Department`
    (
    DeptName varchar(45) primary key,
    HallNumber varchar (2)
    CONSTRAINT valid_HallNumber CHECK (HallNumber in ("1A","1B","1C","2A","2B"))
    );
    
-- User table    
    create table `library_management`.`User`
	(CardNo		int primary key AUTO_INCREMENT ,
	 Name	varchar(45) not null,
     PhoneNumber decimal(10,0)  not null,
	 Email varchar(45) ,
     Password varchar(60) not null,
     DeptName varchar(45)  NOT NULL ,
     Constraint valid_email check (Email like 'f20______@pilani.bits-_%_.ac.in'  or Email like "p20______@pilani.bits-_%_.ac.in" or Email like "h20______@pilani.bits-_%_.ac.in"),
	 CONSTRAINT valid_phoneno CHECK (length(PhoneNumber) = 10),
	 foreign key (DeptName) references `library_management`.`Department`(DeptName) on delete  cascade
	);
    
-- DeptBooks table    
  create table `library_management`.`Deptbooks`
    (
    DeptName varchar(45) ,
	TextBookID decimal(13,0) ,
    foreign key (DeptName) references `library_management`.`Department`(DeptName) on delete  cascade,
	foreign key (TextBookID) references `library_management`.`Book`(ISBN) on delete  cascade on update cascade,
    -- CONSTRAINT valid_ISBN CHECK ( length(TextBookID) = 13),
    CONSTRAINT valid_deptname CHECK (DeptName in ("Computer Science","Electronics","Mechanical","Civil","Chemical","Manufacturing","Mathematics","Economics","Physics","Chemistry","Biology"))
    );
    
-- User's Address   table 
	create table `library_management`.`Address`
	(CardNo int not null ,
    Hostel varchar(10) not null,
    RoomNo decimal(4) not null,
    home_address varchar (45),
    CONSTRAINT valid_Hostel CHECK (Hostel in ("Ram","Budh","Meera","CV Raman","Ashok","Ranapratap","Shankar","Vyas","Krishna","Gandhi","Malvia","Bhagirath")),
     CONSTRAINT valid_RoomNo CHECK (length(CardNo) =4 or length(CardNo)=3),
      -- card no is like 20200969
    CONSTRAINT valid_cardno CHECK (length(CardNo) = 8),
    foreign key (CardNo) references `library_management`.`User`(CardNo)
    );

-- User's book circulation   table     
    create table `library_management`.`circulation`
    (
    loan_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id decimal(13,0)  NOT NULL,
	CardNo INT NOT NULL,
	loan_date DATE NOT NULL,
	due_date DATE NOT NULL,
	returned_date DATE,
    status varchar(1) NOT NULL,
	CONSTRAINT valid_status check (status="P" or status="R") ,
    CONSTRAINT fk_book FOREIGN KEY (book_id) REFERENCES `library_management`.`Book`(ISBN) , 
	CONSTRAINT fk_user FOREIGN KEY (CardNo) REFERENCES `library_management`.`User`(CardNo) on delete  cascade
    );
    
--  Fines table
    create table `library_management`.`fine`
	(
    CardNo INT NOT NULL,
    charges float,
    circulation_id INT,
    reason varchar(45),
    FOREIGN KEY (circulation_id) REFERENCES `library_management`.`circulation`(loan_id),
    CONSTRAINT pos_fine check (charges>0) ,
    CONSTRAINT fk_usr_fine FOREIGN KEY (CardNo) REFERENCES `library_management`.`User`(CardNo) on delete  cascade
    );
    

    

-- inserting data into Book genre
insert into `library_management`.`book_genre` values  ("Pride and Prejudice","Fiction");
insert into `library_management`.`book_genre` values  ("To Kill a Mockingbird","Fiction");
insert into `library_management`.`book_genre` values  ("The Great Gatsby","Classic Literature");
insert into `library_management`.`book_genre` values  ("Pride and Prejudice","Classic Literature");
insert into `library_management`.`book_genre` values  ("1984","Classic Literature");
insert into `library_management`.`book_genre` values  ("Jane Eyre","Classic Literature");
insert into `library_management`.`book_genre` values  ("To Kill a Mockingbird","Classic Literature");
delete  from book_genre;
-- insert into `library_management`.`book_genre` values  (
-- insert into `library_management`.`book_genre` values  (
-- insert into `library_management`.`book_genre` values  (
-- insert into `library_management`.`book_genre` values  (
-- inserting data into Book table
insert into `library_management`.`Book` values (1234567890123 ,"Pride and Prejudice" , 1 ,"Penguin Classics",2,350 );
 insert into `library_management`.`Book` values (9780141439518,"Pride and Prejudice" , 2 ," Penguin Books",3, 299);
 insert into `library_management`.`Book` values (9780446310789,"To Kill a Mockingbird" ,1," Grand Central Publishing", 2,399);
insert into `library_management`.`Book` values(9780451524935,"1984" , 1, "Signet Classics", 3, 299);
insert into `library_management`.`Book` values ( 9780141441146,"Jane Eyre" ,1, "Penguin Classics", 4, 399);

-- Science Fiction:
"Dune" by Frank Herbert (ISBN 9780441172719, Ace Books, Reissue Edition, Ace Books, Rs. 499)
"The Hitchhiker's Guide to the Galaxy" by Douglas Adams (ISBN 9780345391803, Del Rey Books, Reissue Edition, Del Rey Books, Rs. 499)
"Ender's Game" by Orson Scott Card (ISBN 9780812550702, Tor Books, Reprint Edition, Tor Science Fiction, Rs. 399)
"Neuromancer" by William Gibson (ISBN 9780441569595, Ace Books, Reissue Edition, Ace Books, Rs. 499)
"The War of the Worlds" by H.G. Wells (ISBN 9780141439976, Penguin Classics, Reissue Edition, Penguin Classics, Rs. 299)



-- ISBN,Title,Edition,Publisher,Copies 
insert into `library_management`.`Book` values (1234567890123,"Pride and Prejudice" ,1 ,"Penguin Classics",3,200 );
insert into `library_management`.`Book` values (1234567890124,"To Kill a Mockingbird" ,1 ,"HarperCollins",4,300 );
insert into `library_management`.`Book` values (1234567890125,"The Great Gatsby"  ,1 ,"Scribner",3,200 );
insert into `library_management`.`Book` values (1234567890126,"The Great Gatsby"  ,2 ,"Scribner",3,200 );
insert into `library_management`.`Book` values (1234567890126,"The Great Gatsby"  ,2 ,"Scribner",3,200 );




select * from book;

-- inserting data into Author table
insert into `library_management`.`Author` values (1234567890123,"Jane Austen");
insert into `library_management`.`Author` values  (1234567890124,"Harper Lee");
insert into `library_management`.`Author` values  (1234567890126," F. Scott Fitzgerald ");
insert into `library_management`.`Author` values  (9780141439518," Jane Austen ");
insert into `library_management`.`Author` values  (9780446310789,"George Orwell");
insert into `library_management`.`Author` values  (9780451524935," Charlotte Bronte ");
insert into `library_management`.`Author` values  (9780141441146," Charle Bronte ");


-- Science Fiction
-- Dune by Frank Herbert
INSERT INTO `library_management`.`book_genre` VALUES ('Dune', 'Science Fiction');
INSERT INTO `library_management`.`book` VALUES (9780441172719, 'Dune', 1,'Ace Books', 3 , 499);
INSERT INTO `library_management`.`author` VALUES (9780441172719, 'Frank Herbert');

-- The Hitchhiker's Guide to the Galaxy by Douglas Adams
INSERT INTO `library_management`.`book_genre` VALUES ('The Hitchhiker\'s Guide to the Galaxy', 'Science Fiction');
INSERT INTO `library_management`.`book` VALUES ('9780345391803', 'The Hitchhiker\'s Guide to the Galaxy', 2, 'Del Rey Books', 4,499);
INSERT INTO `library_management`.`author` VALUES ('9780345391803', 'Douglas Adams');

-- Ender's Game by Orson Scott Card
INSERT INTO `library_management`.`book_genre` VALUES ('Ender\'s Game', 'Science Fiction');
INSERT INTO `library_management`.`book` VALUES ('9780812550702', 'Ender\'s Game', 1, 'Tor Science Fiction', 2,399);
INSERT INTO `library_management`.`author` VALUES ('9780812550702', 'Orson Scott Card');



-- select * from Book  Book.ISBN=Author.ISBN;
select * from Author;
select * from Book;
select * from book_genre;
delete from author where ISBN = 9780078022159;

-- inserting data into Department table
insert into `library_management`.`Department` values("Computer Science","1A");
insert into `library_management`.`Department` values("Electronics","1B");
insert into `library_management`.`Department` values("Mechanical","2A");
insert into `library_management`.`Department` values("Civil","2B");
insert into `library_management`.`Department` values("Chemical","2B");

select * from department;
-- inserting data into User table 

-- CardNo Name PhoneNumber Email  Password    DeptName
insert into `library_management`.`User` values(20200969,"Dhruv Singh",1234567890,"f20200969@pilani.bits-pilani.ac.in","pass","Computer Science");
insert into `library_management`.`User` values(20210909,"ROSHAN BAGLA",1234567890,"f20210909@pilani.bits-pilani.ac.in","pass","Computer Science");
insert into `library_management`.`User` values(20200010,"SHARDUL SUHAS SHINGARE",1234567890,"f20200010@pilani.bits-pialni.ac.in","pass","Electronics");
insert into `library_management`.`User` values(20210679,"CHANDRASHEKAR RAMACHANDRAN",9904567890,"f20210679@pilani.bits-pialni.ac.in","pass","Electronics");
insert into `library_management`.`User` values(20212169,"AJEY MALIK",1234567890,"f20212169@pilani.bits-pialni.ac.in","pass","Electronics");
insert into `library_management`.`User` values(20210900,"PRANAV DEEPAK TANNA",1234567890,"f20210900@pilani.bits-pialni.ac.in","pass","Computer Science");
insert into `library_management`.`User` values(20200908,"KANDARI NACHIKETSINGH",1234567890,"f20200908@pilani.bits-pialni.ac.in","pass","Mechanical");
insert into `library_management`.`User` values(20212969,"VYAS VEDANT KARTIK",1234567890,"f20212969@pilani.bits-pialni.ac.in","pass","Computer Science");
insert into `library_management`.`User` values(20201969,"ARYAN BANSAL",1234567890,"h20201969@pilani.bits-pialni.ac.in","pass","Civil");
insert into `library_management`.`User` values(20210900,"AMBEKAR SHANTANU NILESH",1234567890,"p20210900@pilani.bits-pialni.ac.in","pass","Chemical");


-- inserting data into Circulation table 
insert into `library_management`.`circulation`(book_id,CardNo ,loan_date ,due_date,status ) values(1234567890123,20200969,"2023-04-08","2023-04-15","P");
insert into `library_management`.`circulation`(book_id,CardNo ,loan_date ,due_date,status) values(9780812550702,20200969,"2023-04-01","2023-04-06","P");


select * from user;
delete from  circulation where loan_id=1;

-- insert into Fine table 
insert into `library_management`.`fine`  values(20200969,10,40,"Late return");


-- Procedure for returing books 
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


-- Procedure for borrowing/issue books 
DELIMITER $$;
CREATE DEFINER=`root`@`localhost` PROCEDURE `issuebook`(IN isbn decimal(13,0), IN cardno varchar(10))
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
Declare copy int unsigned;
Set copy = (select copies from Book where Book.ISBN = isbn );
IF copy>0 THEN 
		Start transaction;
		SET copy = copy-1;
		Update Book set Book.Copies=copy where Book.ISBN = isbn;
		insert into `library_management`.`circulation`(book_id,CardNo ,loan_date ,due_date,status) values(isbn,cardno,curdate(),curdate()+7,"P");
        Commit;

END IF;
End
DELIMITER ;

-- Procedure for renew books 
DELIMITER $$;
CREATE DEFINER=`root`@`localhost` FUNCTION `renewbook`( loan_id int,  cardno int) RETURNS varchar(30) CHARSET utf8mb4
    READS SQL DATA
    SQL SECURITY INVOKER
BEGIN
Declare duedate date ;
Declare issuedate date ;
Declare status varchar(1) ;
Declare result varchar(30);
set duedate=(select due_date from `library_management`.`circulation` where circulation.loan_id=loan_id);
set issuedate=(select loan_date from `library_management`.`circulation` where circulation.loan_id=loan_id);
set status=(select circulation.status from `library_management`.`circulation` where circulation.loan_id=loan_id);

if DATEDIFF( duedate,issuedate)<15 and  status='P' then
        update `library_management`.`circulation` set circulation.due_date= DATE_ADD(duedate, INTERVAL 7 DAY)  where circulation.loan_id=loan_id;
        set result = "Renewed Sucessfully";
elseif DATEDIFF(duedate,issuedate)>15 and  status='P'  then
		set result = "Cannot Renew Limit Exceeded!!";
elseif status='R'  then
		set result = "Cannot renew returned Book";
END IF;
	return result;
End
DELIMITER ;




select renewbook(43,2020969);




CALL issuebook(1234567890126,20200969) ;
CALL returnbook(44,20200969) ;

select * from Circulation;
select * from fine;
select * from Book;
delete  from circulation;


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


    