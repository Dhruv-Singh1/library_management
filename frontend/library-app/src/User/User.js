import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios'
import './User.css'
import { useContext } from 'react';
import { redirect } from 'react-router-dom';
import AuthContext from '../authContext';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Table } from 'react-bootstrap';

function User(props) {
  const location = useLocation();
  const { state: loginData } = location;
  const navigate = useNavigate(); 

  const [search,setsearch] = useState("");
  const [canterror,setcanterror] = useState("");
  const [searched,setsearched] = useState({});
  const [user,setuser] = useState({});
  const [issuedBooks,setissuedBooks] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const handleIssue = (bookid,cardno) => {
    callIssue({
      book_id: bookid,
      CardNo: cardno
    });
  }

  const callIssue = (prop) => {
    console.log(prop);
        axios.post(`http://localhost:8000/borrow/borrow`,prop)
          .then(res => {
            console.log(res.data);  
            // refresh(); 
          })
          .catch(err => {
            console.log(err);
            setcanterror(err.message);
            // handle error
          });     
  }

  useEffect(() => {
    if (!loginData) {
      navigate('/');
    }else {
      console.log(loginData);
      axios.get(`http://localhost:8000/borrow/${loginData.user.CardNo}`)
          .then(res => {
            console.log(res.data);
            setissuedBooks(res.data);
          })
          .catch(err => {
            console.log(err);
          });  
    }
     
  }, [loginData,navigate]);



  const handleSearch = ()=> {
    console.log(search);
    axios.get(`http://localhost:8000/books/title/${search}`)
          .then(res => {
            console.log(res.data);
            setsearched(res.data);
            
          })
          .catch(err => {
            console.log(err);
            // handle error
          });       
    console.log(searched);
  }

  return (
    <div>
      User Page
      <br/>
      <label>Search</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onChange={(event) => {
                    setsearch(event.target.value)}}
                />
                <button onClick={handleSearch}>Search</button>
               
               
                {searched.book && searched.book.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ISBN</th>
              <th>Title</th>
              <th>Edition</th>
              <th>Publisher</th>
              <th>Copies</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{searched.book[0].ISBN}</td>
              <td>{searched.book[0].Title}</td>
              <td>{searched.book[0].Edition}</td>
              <td>{searched.book[0].Publisher}</td>
              <td>{searched.book[0].Copies}</td>
              <td>{searched.book[0].Author}</td>
              <td>
                  <button onClick={() => handleIssue(searched.book[0].ISBN , loginData.user.CardNo)}>Issue</button>
                </td>
            </tr>
          </tbody>
        </table>
      ) : (
        <div></div>
      )}

    
<div>
  {issuedBooks && issuedBooks.length > 0 ? (
    <>
      <h1>User Issued Books</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Card No</th>
            <th>Title</th>
            <th>Edition</th>
            <th>ISBN</th>
            <th>Publisher</th>
            <th>Loan Date</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.map((data) => (
            <tr key={data.loan_id}>
              <td>{data.CardNo}</td>
              <td>{data.Title}</td>
              <td>{data.Edition}</td>
              <td>{data.ISBN}</td>
              <td>{data.Publisher}</td>
              <td>{data.loan_date}</td>
              <td>{data.due_date}</td>

            </tr>
          ))}
        </tbody>
      </Table>
    </>
  ) : (
    <p>No issued books found.</p>
  )}
</div>




         
    </div>
    
  )
}

export default User;


{/* <th>ISBN</th>
<th>Title</th>
<th>Edition</th>
<th>Publisher</th>
<th>Copies</th>
<th>Price</th>
<th>Issue</th> */}