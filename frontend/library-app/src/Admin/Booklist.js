import React from "react";
import { useState } from "react"; 
import axios from "axios";

const BookList = ({ bookList }) => {
    if ( !bookList.books) {
        return <div>Loading...</div>;
      }
    
    const [newBook,setnewBook] = useState({
        
    });

    const [showForm, setShowForm] = useState(false);

    const handleAddBook = () => {
        setShowForm(!showForm);
    };

  return (
    <div className="book-list">
      <h2>Book List</h2>
      <button className="add-button" onClick={handleAddBook}>Add</button>
      <p className="count">Total Books: {bookList.count}</p>
      {showForm && (
        <div>
            Lol form
        </div>
      )}
      <div className="books">
      {bookList.books.map((book, index) => (
          <div className="book" key={index}>
            <div className="book-details">
            <p className="isbn">ISBN: {book.ISBN}</p>
            <p className="title">Title: {book.Title}</p>
            <p className="edition">Edition: {book.Edition}</p>
            <p className="publisher">Publisher: {book.Publisher}</p>
            <p className="copies">Copies Available: {book.Copies}</p>
            <p className="author">
            {book.Author && book.Author.length > 0 ? (
        <p className="author"> Author(s) : {book.Author.join(", ")}</p>
      ) : (
        <p className="author">Unknown Author</p>
      )}
            </p>
            <p className="genre">Genre: {book.Genre || "Unknown"}</p>
            </div>
            <div className="book-actions">
     <button className="edit-button">Edit</button>
     <button className="delete-button">Delete</button>
      </div>
          </div>
        ))}
      </div>

      </div>

  );
};
// Neema op
export default BookList;