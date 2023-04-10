import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import "bootstrap/dist/css/bootstrap.min.css";


export default function Login() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [passwordError, setpasswordError] = useState("");
    const [emailError, setemailError] = useState("");
    const [Login,setLogin] = useState(false);

    const navigate = useNavigate();

    const navigateReg = () => {
        navigate('/register');
      };

    const handleSubmission = (e) => {
        e.preventDefault();
        if ( email == "cool@gmail.com") {
            setLogin(true);
        }

        if(Login){
            navigate('/User');
        }
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
                  onChange={(event) => setEmail(event.target.value)}
                />
                <small id="emailHelp" className="text-danger form-text">
                  {emailError}
                </small>
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
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
