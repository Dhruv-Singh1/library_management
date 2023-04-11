import React from 'react'
import {useState,useEffect} from 'react'
import Booklistfunc from './Booklist'
import CheckedOutBooks from './CheckedoutBooks'
import { useNavigate , useLocation} from 'react-router-dom';

import './Admin.css'
import axios from 'axios';

export default function Admin(props) {
    const [Booklist,setBooklist] = useState([]);
    const [borrowedList,setborrowedList] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const { state: loginData } = location;
    var config = {
        method: 'get',
        url: 'http://localhost:8000/books/',
        headers : {
            'Content-type' : 'application/json'
        }
    }

    function formatDate(date) {
        if(date) {
          const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
          return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
        }else{
          return "Not Defined";
        }
    
      }

    useEffect(() => {
        axios(config)
        .then(res => {
            console.log(res)
            setBooklist(res.data)
        })
        .catch(err =>{
            console.log(err)
        })
    },[])

    useEffect(() => {
        if (!loginData) {
          navigate('/');
        }   
      }, [loginData,navigate]);

    
    
    
    useEffect(() => {
        axios.get('http://localhost:8000/borrow/')
        .then(res => {
          console.log(res.data);
          setborrowedList(res.data);
        })
        .catch(err => {
          console.log(err);
        });   
        },[])

    // useEffect(() => {
    //         axios.get('http://localhost:8000/borrow/')
    //         .then(res => {
    //           console.log(res.data);
    //           setborrowedList(res.data);
    //         })
    //         .catch(err => {
    //           console.log(err);
    //         });   
    //         },[])
    

    return(
        <div>
            
            <h1>Admin Portal</h1>
            <Booklistfunc bookList={Booklist} /> 

        <h2>Borrowed Books</h2>
        <table>
        <thead>
            <tr>
            <th>CardNo</th>
            <th>ISBN</th>
            <th>Name</th>
            <th>Title</th>
            <th>Due Date</th>
            <th>Loan Date</th>
            </tr>
        </thead>
        <tbody>
            {borrowedList.map((item, index) => (
            <tr key={index}>
                <td>{item.CardNo}</td>
                <td>{item.ISBN}</td>
                <td>{item.Name}</td>
                <td>{item.Title}</td>
                <td>{formatDate(item.due_date)}</td>
                <td>{formatDate(item.loan_date)}</td>
            </tr>
            ))}
        </tbody>
    </table>
        </div>
    )
}