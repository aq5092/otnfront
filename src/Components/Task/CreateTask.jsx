import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL_USERS } from '../Path';
function CreateTask() {
    const [item, setItem] = useState({
        task_name: '',
        
    })
    
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${URL_USERS}`+ 'taskc/', {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          });
    
          const data = await response.json();
          console.log("Response from server:", data);
          navigate('/tasks')
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
      };
        
  return (
    <>
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light ">
        <div className="w-150 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>New task</h1>
        <form onSubmit={handleSubmit}>
            <div className='mb-2'>
                <label htmlFor="username">Topshiriq nomi: </label>
                <input type="text" name='task_name' value={item.task_name} onChange={handleChange}/>
            </div>
                        
            <Button type="submit" variant="outline-danger" >Submit</Button>
            
            
            <Link to="/tasks" className='btn btn-info'>Back</Link>
        </form>
        </div>
        </div>
        </>
  )
}

export default CreateTask