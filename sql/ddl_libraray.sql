create table `library_management`.`Author`
	(AuthorID	int primary key AUTO_INCREMENT ,
	 Name varchar(45)
	);
    
    create table `library_management`.`Book`
	(ISBN	decimal(13,0)  primary key ,
	 Title	varchar(45) not null,
     Edition int unsigned not null,
	 Publisher varchar(45),
     AuthorID int ,
     Copies int unsigned not null ,
	CONSTRAINT valid_ISBN CHECK ( length(ISBN) = 13),
	 foreign key (AuthorID) references `library_management`.`Author` (`AuthorID`)
		on delete set null
	);
    
   create table `library_management`.`Department`
    (
    DeptName varchar(45) primary key,
    TextBookID decimal(10,0) ,
	foreign key (TextBookID) references `library_management`.`Book`(ISBN)
	on delete set null
    
    );
    
    create table `library_management`.`User`
	(CardNo		int primary key AUTO_INCREMENT ,
	 Name	varchar(45) not null,
     PhoneNumber decimal(10)  not null,
	 Email varchar(45),
     Password varchar(20) not null,
     DeptName varchar(45)  NOT NULL ,
	 foreign key (DeptName) references `library_management`.`Department`(DeptName)
		on delete  cascade
	);
    
    
    
  create table `library_management`.`DeptSection`
    (
    DeptName varchar(45) ,
    HallNumber varchar (2),
    foreign key (DeptName) references `library_management`.`Department`(DeptName) on delete  cascade
    );
    
	create table `library_management`.`Address`
	(CardNo int not null ,
    Hostel varchar(10),
    RoomNo decimal(4),
    home_address varchar (45),
    foreign key (CardNo) references `library_management`.`User`(CardNo)
    );
    
    create table `library_management`.`circulation`
    (
    loan_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id decimal(10,0)  NOT NULL,
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
    CONSTRAINT fk_usr_fine FOREIGN KEY (CardNo) REFERENCES `library_management`.`User`(CardNo)
    
    );
    
	create table `library_management`.`book_genre`
	(
    BookTitle	varchar(45) primary key,
	Genre	varchar(45) not null,
    constraint fk_genre_book FOREIGN KEY (BookTitle) REFERENCES `library_management`.`Book`(Title) on delete  cascade
    
    );
    

insert into `library_management`.`Author` values (1,"Jane Austen");
insert into `library_management`.`Author` values  (2,"Harper Lee");
insert into `library_management`.`Author` values  (3," F. Scott Fitzgerald ");

-- ISBN,Title,Edition,Publisher, AuthorID ,Copies 
insert into `library_management`.`Book` values (1234567890123,"Pride and Prejudice" ,1 ,"Penguin Classics",1,3 );
insert into `library_management`.`Book` values (1234567890124,"To Kill a Mockingbird" ,1 ,"HarperCollins",2,4 );
insert into `library_management`.`Book` values (1234567890125,"The Great Gatsby"  ,1 ,"Scribner",3,3 );

select * from Book;
