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
            <th>User</th>
            <th>Topshiriq turi</th>
            <th>Asos</th>
            <th>Buyruq raqami</th>
            <th>Sana</th>
            <th>Mazmuni</th>
            <th>Xodimlar soni</th>
            <th>Status</th>
            <th>Izoh</th>
            <th>Link</th>
            <th>Link_kimda</th>
            <th>Read</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td key={index}>user </td>
              <td key={index}>{item.turi} </td>
              <td key={index}>{item.asos} </td>
              <td key={index}>{item.buyruq} </td>
              <td key={index}>{item.created_at} </td>
              <td key={index}>{item.mazmuni} </td>
              <td key={index}>{item.xodim_soni} </td>
              <td key={index}>{item.status} </td>
              <td key={index}>{item.izoh} </td>
              <td key={index}>{item.link} </td>
              <td key={index}>{item.link_kimda} </td>
              
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