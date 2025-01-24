import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { URL_USERS } from '../Path';
function ReadTask() {
    const [data, setData]= useState([]);
    const {id} = useParams();
    useEffect(()=>{
        axios.get(`${URL_USERS}`+ 'tasks/'+id)
        .then(res=> setData(res.data))
        .catch(err=> console.log(err))
    }, [])

  return (
    <>
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
        <div className="w-100 border bg-white shadow px-5 pt-3 pb-5 rounded ">
        <h4>Detail of User</h4>
        <div className="mb-2"><strong>Topshiriq nomi: {data.task_name}</strong></div>
        
        <Link to={`/tasku/${id}`} className='btn btn-success'>Edit</Link>
        <Link to={'/tasks'} className='btn btn-primary ms-3'>Back</Link>
        </div>
        </div>
    </>
  )
}

export default ReadTask