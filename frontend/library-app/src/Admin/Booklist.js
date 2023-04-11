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
      <label>
        Title:
        <input type="text" onChange={(event) => setNewBook({...newBook, Title: event.target.value})} required />
      </label>
      <label>
        Edition:
        <input type="number" onChange={(event) => setNewBook({...newBook, Edition: event.target.value})} required />
      </label>
      <label>
        Publisher:
        <input type="text" onChange={(event) => setNewBook({...newBook, Publisher: event.target.value})} required />
      </label>
      <label>
        Copies:
        <input type="number" onChange={(event) => setNewBook({...newBook, Copies: event.target.value})} required />
      </label>
      <label>
        Genre:
        <input type="text"  onChange={(event) => setNewBook({...newBook, Genre: event.target.value})} required />
      </label>
      <label>
        Author:
        <input type="text" onChange={(event) => setNewBook({...newBook, Authors: event.target.value})} required />
      </label>
      <label>
        price:
        <input type="number" onChange={(event) => setNewBook({...newBook, price: event.target.value})} required />
      </label>
      <button type="submit">Add Book</button>
    </form>

    {console.log(newBook)}

        </div>
      )}
    <div className="book-table-container">
    <table className="book-table">
  <thead>
    <tr>
      <th>ISBN</th>
      <th>Title</th>
      <th>Edition</th>
      <th>Publisher</th>
      <th>Copies Available</th>
      <th>Author(s)</th>
      <th>Genre</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {bookList.books.map((book, index) => (
      <tr className="book" key={index}>
        <td>{book.ISBN}</td>
        <td>{book.Title}</td>
        <td>{book.Edition}</td>
        <td>{book.Publisher}</td>
        <td>{book.Copies}</td>
        <td>
          {book.Author && book.Author.length > 0 ? (
            <p className="author">{book.Author.join(", ")}</p>
          ) : (
            <p className="author">Unknown Author</p>
          )}
        </td>
        <td>{book.Genre || "Unknown"}</td>
        <td>
          <button className="delete-button" onClick={() => DeleteBook(book.ISBN)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
     

      </div>

  );
};
// Neema op
export default BookList;