import React from "react";
import { useState , useEffect} from "react"; 
import axios from "axios";

const BookList = ({ bookList }) => {
    if ( !bookList.books) {
        return <div>Loading...</div>;
      }
    
      const [newBook, setNewBook] = useState({
        ISBN: 0,
        Title: '',
        Edition: 0,
        Publisher: '',
        Authors: [""],
        Copies: 0,
        Genre: '',
        price: 0
        
      });
}