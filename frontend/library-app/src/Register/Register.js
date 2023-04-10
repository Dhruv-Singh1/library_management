import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Register.css'


export default function Register() {

    const [regnew,setregnew] = useState({
      name:'',
      phoneno: '',
      email: '',
      pass: '',
      deptname: '',
      room: '',
      bhawan: '',
      homeaddress: ''
    });

    const navigate = useNavigate();
    const navigateReg = () => {
        navigate('/');
      };

    const hanndleRegister = (e) => {
      e.preventDefault();
      axios.post('http://localhost:8000/user/', regnew)
      .then(res => {
        console.log(res.data);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
        // handle error
      });   

      

    }

    return (
        <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={hanndleRegister}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter name" onChange={(event) => setregnew({...regnew,name: event.target.value})} />
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={(event) => setregnew({...regnew,email: event.target.value})}/>
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => setregnew({...regnew,pass: event.target.value})} />
                <label>Room number</label>
                <input type="text" className="form-control" placeholder="Enter address" onChange={(event) => setregnew({...regnew,room: event.target.value})} />
                <label>Bhawan</label>
                <input type="text" className="form-control" placeholder="Enter address" onChange={(event) => setregnew({...regnew,bhawan: event.target.value})} />
                <label>Home Address</label>
                <input type="text" className="form-control" placeholder="Enter address" onChange={(event) => setregnew({...regnew,homeaddress: event.target.value})} />
                <label>Department</label>
                <input type="text" className="form-control" placeholder="Enter department" onChange={(event) => setregnew({...regnew,deptname: event.target.value})} />
                <label>Phone number</label>
                <input type="tel" className="form-control" placeholder="Enter phone number" onChange={(event) => setregnew({...regnew,phoneno: event.target.value})} />
              </div>

              <button type="submit" className="btn btn-primary my-2 " >
                Register
              </button>
              <button onClick={navigateReg} className="btn btn-primary mx-2 my-2 btn-info">Back to Login</button>
            </form>
          </div>
        </div>
      </div>
    );
}