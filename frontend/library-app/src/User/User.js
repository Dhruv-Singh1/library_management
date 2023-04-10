import React from 'react'
import {useState} from 'react'

function User() {
  const [searchText, setSearchText] = useState("");
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [unissuedBooks, setUnissuedBooks] = useState([
    { id: 1, isbn: "1234567890", title: "Book 1", edition: "1st", publisher: "Publisher 1", copies: 5, price: 10.99 },
    { id: 2, isbn: "0987654321", title: "Book 2", edition: "2nd", publisher: "Publisher 2", copies: 3, price: 14.99 },
    { id: 3, isbn: "1357908642", title: "Book 3", edition: "3rd", publisher: "Publisher 3", copies: 2, price: 12.99 }
  ]);
  const [fines, setFines] = useState([]);

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  const handleIssueBook = (book) => {
    const index = unissuedBooks.findIndex((b) => b.id === book.id);
    if (index >= 0) {
      const updatedBooks = [...unissuedBooks];
      updatedBooks[index].copies -= 1;
      setUnissuedBooks(updatedBooks);
      const issuedBook = { ...book, issuedDate: new Date(), returnDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) };
      setIssuedBooks([...issuedBooks, issuedBook]);
    }
  };

  const handleReturnBook = (book) => {
    const index = issuedBooks.findIndex((b) => b.id === book.id);
    if (index >= 0) {
      const updatedBooks = [...issuedBooks];
      updatedBooks.splice(index, 1);
      setIssuedBooks(updatedBooks);
      const fineAmount = calculateFine(book.returnDate);
      if (fineAmount > 0) {
        setFines([...fines, { book, fineAmount }]);
      }
      const updatedUnissuedBooks = [...unissuedBooks];
      const unissuedIndex = updatedUnissuedBooks.findIndex((b) => b.id === book.id);
      if (unissuedIndex >= 0) {
        updatedUnissuedBooks[unissuedIndex].copies += 1;
      } else {
        updatedUnissuedBooks.push({ ...book, copies: 1 });
      }
      setUnissuedBooks(updatedUnissuedBooks);
    }
  };

  const calculateFine = (returnDate) => {
    const daysLate = Math.max(Math.ceil((Date.now() - returnDate.getTime()) / (24 * 60 * 60 * 1000)), 0);
    const finePerDay = 0.5; // 50 cents per day
    return daysLate * finePerDay;
  };

  const filteredBooks = unissuedBooks.filter((book) => {
    return book.title.toLowerCase().includes(searchText.toLowerCase()) || book.isbn.toLowerCase().includes(searchText.toLowerCase());
  });

  return (
    <>
      <h1>User Page</h1>
      <h2>Search for Books</h2>
      <input type="text" value={searchText} onChange={handleSearch} />
      <h2>Unissued Books</h2>
      <table>
      <thead>
    <tr>
      <th>ISBN</th>
      <th>Title</th>
      <th>Edition</th>
      <th>Publisher</th>
      <th>Copies</th>
      <th>Price</th>
      <th>Issue</th>
    </tr>
  </thead>
  <tbody>
    {filteredBooks.map((book) => (
      <tr key={book.id}>
        <td>{book.isbn}</td>
        <td>{book.title}</td>
        <td>{book.edition}</td>
        <td>{book.publisher}</td>
        <td>{book.copies}</td>
        <td>{book.price}</td>
        <td>
          <button onClick={() => handleIssueBook(book)}>Issue</button>
        </td>
      </tr>
    ))}
  </tbody>
  <h2>Issued Books</h2>
  <table>
    <thead>
      <tr>
        <th>ISBN</th>
        <th>Title</th>
        <th>Edition</th>
        <th>Publisher</th>
        <th>Issued Date</th>
        <th>Return Date</th>
        <th>Fine Amount</th>
        <th>Return</th>
      </tr>
    </thead>
    <tbody>
      {issuedBooks.map((book) => (
        <tr key={book.id}>
          <td>{book.isbn}</td>
          <td>{book.title}</td>
          <td>{book.edition}</td>
          <td>{book.publisher}</td>
          <td>{book.issuedDate.toLocaleDateString()}</td>
          <td>{book.returnDate.toLocaleDateString()}</td>
          <td>{calculateFine(book.returnDate)}</td>
          <td>
            <button onClick={() => handleReturnBook(book)}>Return</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  {fines.length > 0 && (
    <>
      <h2>Fines</h2>
      <table>
        <thead>
          <tr>
            <th>ISBN</th>
            <th>Title</th>
            <th>Edition</th>
            <th>Publisher</th>
            <th>Fine Amount</th>
          </tr>
        </thead>
        <tbody>
          {fines.map((fine) => (
            <tr key={fine.book.id}>
              <td>{fine.book.isbn}</td>
              <td>{fine.book.title}</td>
              <td>{fine.book.edition}</td>
              <td>{fine.book.publisher}</td>
              <td>{fine.fineAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )}
  </table>
</>
);
}

export default User;