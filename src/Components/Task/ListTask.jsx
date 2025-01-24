import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { URL_USERS } from "../Path";
import { Link } from "react-router-dom";

function ListTasks() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get(`${URL_USERS}`+ 'tasks/',
        {
          "Content-Type": "application/json",
          
        }
      )
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const onDelete = (id) => {
    const confirm  = window.confirm("Would you like to DELETE")
    if(confirm){
      axios.delete(`${URL_USERS}`+ 'taskd/'+ id+'/')
      .then(res=>{
        // navigator("/users")
        window.location.reload();
      })
    }
  };

  const onEdit = () => {
    console.log("edit");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  return (
    <div>
      <h1>Topshiriqlar</h1>
      <Link to={'/taskc/'} className="btn btn-success">  Create task</Link>
      
      <Link to={'/'} className="btn btn-primary"> Home</Link>

    
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Topshiriq nomi</th>
            
            <th>Read</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td key={index}>{item.task_name} </td>
              
              <td><Link to={`/tasks/${item.id}`} className="btn btn-outline-primary">Read</Link></td>
              <td>
                <Link to={`/tasku/${item.id}`} className="btn btn-outline-success">Update</Link>
              </td>
              <td>
                <Button variant="outline-danger" onClick={e => onDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ListTasks;