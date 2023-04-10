import React from "react";
import { useState , useEffect} from "react"; 
import axios from "axios";

const BookList = ({ bookList }) => {

    // const [Newlist,setNewlist] = useState([]);
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
      
      const addNewBook = () => {
        axios.post('http://localhost:8000/books/', newBook)
          .then(res => {
            console.log(res.data);
          })
          .catch(err => {
            console.log(err);
            // handle error
          });
      };

      const refresh = () => window.location.reload(true);

      const DeleteBook = (val) => {
        console.log("book deleted");
        console.log(val);
        axios.get(`http://localhost:8000/books/delete/${val}`)
          .then(res => {
            console.log(res.data);
            refresh();
          })
          .catch(err => {
            console.log(err);
          });

      }

      
    const [showForm, setShowForm] = useState(false);

    const handleAddBook = () => {
        setShowForm(!showForm);
    };

    const handleAddSubmit = () => {
     addNewBook();
    }

  return (
    <div className="book-list">
      <h2>Book List</h2>
      <button className="add-button" onClick={handleAddBook}>Add</button>
      <p className="count">Total Books: {bookList.count}</p>
      {showForm && (
        <div>
            <form onSubmit={handleAddSubmit}>
      <h2>Add a New Book</h2>
      <label>
        ISBN:
        <input type="number" onChange={(event) => setNewBook({...newBook, ISBN: event.target.value})} required />
      </label>
      <br />
      <label>
        Title:
        <input type="text" onChange={(event) => setNewBook({...newBook, Title: event.target.value})} required />
      </label>
      <br />
      <label>
        Edition:
        <input type="number" onChange={(event) => setNewBook({...newBook, Edition: event.target.value})} required />
      </label>
      <br />
      <label>
        Publisher:
        <input type="text" onChange={(event) => setNewBook({...newBook, Publisher: event.target.value})} required />
      </label>
      <br />
      <label>
        Copies:
        <input type="number" onChange={(event) => setNewBook({...newBook, Copies: event.target.value})} required />
      </label>
      <br />
      <label>
        Genre:
        <input type="text"  onChange={(event) => setNewBook({...newBook, Genre: event.target.value})} required />
      </label>
      <br />
      <label>
        Author:
        <input type="text" onChange={(event) => setNewBook({...newBook, Authors: event.target.value})} required />
      </label>
      <br />
      <label>
        price:
        <input type="number" onChange={(event) => setNewBook({...newBook, price: event.target.value})} required />
      </label>
      <br />
      <button type="submit">Add Book</button>
    </form>

    {console.log(newBook)}

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
     <button className="delete-button" onClick={() => DeleteBook(book.ISBN)}>Delete</button>
      </div>
          </div>
        ))}
      </div>

      </div>

  );
};
// Neema op
export default BookList;