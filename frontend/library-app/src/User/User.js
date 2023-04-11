import React from 'react'
import {useState} from 'react'
import axios from 'axios'

function User(props) {
  const [search,setsearch] = useState("");
  const [searched,setsearched] = useState({});

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
                {console.log(searched[0].ISBN)}
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