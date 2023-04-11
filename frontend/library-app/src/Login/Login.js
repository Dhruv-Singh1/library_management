import React from 'react'
import {useState} from 'react'
import User from '../User/User'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import {setGlobalState , useGlobalState} from '../userContext'



export default function Login(props) {

    const [logininfo,setlogininfo] = useState({
      email: '',
      pass: ''
    })
    const [passwordError, setpasswordError] = useState("");
    const [Login,setLogin] = useState(false);
    const [stat] = useGlobalState("login");

    const navigate = useNavigate();

    const navigateReg = () => {
        navigate('/register');
      };

    const handleSubmission = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8000/user/login', logininfo)
          .then(res => {
            console.log(res.data);
            setLogin(true);
            navigate('/User');
            User(res.data);
          })
          .catch(err => {
            console.log(err);
            setpasswordError("username or password is invalid")

            // handle error
          });       
        
    }
    

  return (

  
    <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" onSubmit={handleSubmission} >
              <div className="form-group">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(event) => setlogininfo({...logininfo, email: event.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(event) => setlogininfo({...logininfo, pass: event.target.value})}
                />
                <small id="passworderror" className="text-danger form-text">
                  {passwordError}
                </small>
              </div>

              <button type="submit" className="btn btn-primary my-2 ">
                Log in
              </button>
              <button onClick={navigateReg} className="btn btn-primary mx-2 my-2 btn-info">Register</button>
            </form>
          </div>
        </div>
      </div>
  );
}
