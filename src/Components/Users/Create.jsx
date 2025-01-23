import React, { useState } from 'react'
import { Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL_USERS } from '../Path';
function CreateUser() {
    const [item, setItem] = useState({
        username: '',
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${URL_USERS}`+ 'userc/', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          });
    
          const data = await response.json();
          console.log("Response from server:", data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
      };
    


    // const handlesubmit= (event)=>{
    //     event.preventDefault();
    //     axios
    //     .post(`${URL_USERS}`+ 'userc/', values)
    //     .then((response) => {
    //       console.log(response.data);
    //       navigate('/users')
    //     })
    //     .catch((error) => {
    //       console.log("error", error);
    //     });
    // }
    return (
        <>
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light ">
        <div className="w-150 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add user</h1>
        <form onSubmit={handleSubmit}>
            <div className='mb-2'>
                <label htmlFor="username">Username: </label>
                <input type="text" name='username' value={item.name} onChange={handleChange}/>
            </div>
            
            <div className='mb-2'>
                <label htmlFor="email">Email: </label>
                <input type="text" name='email' value={item.name} onChange={handleChange} />
            </div>
            <div className='mb-2'>
                <label htmlFor="password">Password: </label>
                <input type="text" name='password' value={item.name} onChange={handleChange} />
            </div>
            <button type="submit">Submit</button>
            <Link to="/users" className='btn btn-info'>Back</Link>
        </form>
        </div>
        </div>
        </>
  )
}

export default CreateUser