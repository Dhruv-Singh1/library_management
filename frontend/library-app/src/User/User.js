import React from 'react'
import {useState , useEffect} from 'react'
import axios from 'axios'
import './User.css'
import { useContext } from 'react';
import { redirect } from 'react-router-dom';
import AuthContext from '../authContext';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Table , Button} from 'react-bootstrap';

function User(props) {
  const location = useLocation();
  const { state: loginData } = location;
  const navigate = useNavigate(); 

  const [search,setsearch] = useState("");
  const [canterror,setcanterror] = useState("");
  const [searched,setsearched] = useState({});
  const [totalfines,settotalfines] = useState({});
  const [user,setuser] = useState({});
  const [issuedBooks,setissuedBooks] = useState([]);
  const [finebooks,setfinebooks] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const handleIssue = (bookid,cardno) => {
    callIssue({
      book_id: bookid,
      CardNo: cardno
    });
  }

  function formatDate(date) {
    if(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
      return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
    }else{
      return "Not Defined";
    }

  }
  

  const returnBook = (loan,cardno) => {
    console.log(cardno);
    axios.post(`http://localhost:8000/borrow/return`, {
      loan_id: loan,
      CardNo: cardno
    } )
    .then(res => {
      console.log(res.data);  
      // refresh(); 
    })
    .catch(err => {
      console.log(err);
      // handle error
    });   
  }
  const renewBook = (loan,cardno) => {
    console.log(loan);
    axios.post(`http://localhost:8000/borrow/renew`, {
      loan_id: loan,
      CardNo: cardno
    } )
    .then(res => {
      console.log(res.data);  
      // refresh(); 
    })
    .catch(err => {
      console.log(err);
      // handle error
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

  useEffect(() => {
    axios.get(`http://localhost:8000/borrow/fines/${loginData.user.CardNo}`)
    .then(res => {
      console.log(res.data);
      setfinebooks(res.data.books);
      settotalfines(res.data.totalfine);

    })
    .catch(err => {
      console.log(err);
    });   
    },[])
  



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
      <h1>Welcome {loginData.user.Name}</h1>
      <br/>
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
      <h1>{loginData.user.Name} Issued Books</h1>
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
            <th>Action</th>
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
              <td>{formatDate(data.loan_date)}</td>
              <td>{formatDate(data.due_date)}</td>
              <td>
              
                <div>
                  <Button
                    variant="success"
                    onClick={() => renewBook(data.loan_id,data.CardNo)}
                  >
                    Renew
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => returnBook(data.loan_id,data.CardNo)}
                  >
                    Return
                  </Button>
                </div>
              
            </td>

            </tr>
          ))}
        </tbody>
      </Table>
    </>
  ) : (
    <p>No issued books found.</p>
  )}
</div>


<div>
    <h3>Total Fine:</h3>
    <h3>{totalfines.Total_Fine}</h3>
    <br/>
    <h2>Fine on Issued Books</h2>
    <table>
      <thead>
        <tr>
          <th>Loan ID</th>
          <th>ISBN</th>
          <th>Title</th>
          <th>Edition</th>
          <th>Due Date</th>
          <th>Returned Date</th>
          <th>Charges</th>
        </tr>
      </thead>
      <tbody>
        {finebooks.map((book, index) => (
          <tr key={index}>
            <td>{book.loan_id}</td>
            <td>{book.ISBN}</td>
            <td>{book.Title}</td>
            <td>{book.Edition}</td>
            <td>{formatDate(book.due_date)}</td>
            <td>{formatDate(book.returned_date)}</td>
            <td>{book.charges}</td>
          </tr>
        ))}
      </tbody>
    </table>


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