import React from 'react'
import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './Register.css'


export default function Register() {

    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [Name, setName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Dept, setDept] = useState("");
    const [Address, setAddress] = useState("");

    const navigate = useNavigate();
    const navigateReg = () => {
        navigate('/');
      };

    return (
        <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <form id="loginform" >
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Enter name" onChange={(event) => setName(event.target.value)} />
                <label>Email address</label>
                <input type="email" className="form-control" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)}/>
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} />
                <label>Address</label>
                <input type="text" className="form-control" placeholder="Enter address" onChange={(event) => setAddress(event.target.value)} />
                <label>Department</label>
                <input type="text" className="form-control" placeholder="Enter department" onChange={(event) => setDept(event.target.value)} />
                <label>Phone number</label>
                <input type="tel" className="form-control" placeholder="Enter phone number" onChange={(event) => setPhone(event.target.value)} />
              </div>

              <button type="submit" className="btn btn-primary my-2 ">
                Register
              </button>
              <button onClick={navigateReg} className="btn btn-primary mx-2 my-2 btn-info">Back to Login</button>
            </form>
          </div>
        </div>
      </div>
    );
}