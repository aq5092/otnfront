import React, { useState } from 'react'
import { Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL_USERS } from '../Path';
function CreateUser() {
    const [values, setValues] = useState({
        username: '',
        email: '',
    })
    const navigate = useNavigate();
    const handlesubmit= (event)=>{
        event.preventDefault();
        axios
        .post(`${URL_USERS}`+ 'users', values, {referrerPolicy: "unsafe-url",
            "Content-Type": "application/json",           
           })
        .then((response) => {
          console.log(response.data);
          navigate('/users')
        })
        .catch((error) => {
          console.log("error", error);
        });
    }
    return (
        <>
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light ">
        <div className="w-150 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Add user</h1>
        <form onSubmit={handlesubmit}>
            <div className='mb-2'>
                <label htmlFor="name">Username: </label>
                <input type="text" name='ismi' onChange={e=>setValues({...values, username: e.target.value})}/>
            </div>
            
            <div className='mb-2'>
                <label htmlFor="email">Email: </label>
                <input type="text" name='email' onChange={e=>setValues({...values, email:e.target.value})} />
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