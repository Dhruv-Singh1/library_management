import React from "react";

const BookList = ({ bookList }) => {
    console.log(bookList.books)
    if ( !bookList.books) {
        return <div>Loading...</div>;
      }
 

  return (
    <div className="book-list">
      <h2>Book List</h2>
      <p className="count">Total Books: {bookList.count}</p>

      <div className="books">
      {bookList.books.map((book, index) => (
          <div className="book" key={index}>
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
        ))}
      </div>

      </div>

  );
};
// Neema op
export default BookList;