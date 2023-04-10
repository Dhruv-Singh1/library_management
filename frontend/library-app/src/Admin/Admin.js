import React from 'react'
import {useState,useEffect} from 'react'
import Booklistfunc from './Booklist'
import { useNavigate } from 'react-router-dom';
import './Admin.css'
import axios from 'axios';

export default function Admin() {
    const [Booklist,setBooklist] = useState([]);
    const navigate = useNavigate();
    var config = {
        method: 'get',
        url: 'http://localhost:8000/books/',
        headers : {
            'Content-type' : 'application/json'
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

    return(
        <div>
            Admin Page
            <Booklistfunc bookList={Booklist} /> 
            {console.log(Booklist)}
        </div>
    )
}