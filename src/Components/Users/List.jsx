import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { URL_USERS } from "../Path";
import { Link } from "react-router-dom";

function ListUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL_USERS}` + "users/", { "Content-Type": "application/json" })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const onDelete = (id) => {
    const confirm = window.confirm("Would you like to DELETE");
    if (confirm) {
      axios.delete(`${URL_USERS}` + "userd/" + id + "/").then((res) => {
        // navigator("/users")
        window.location.reload();
      });
    }
  };

  return (
    <div>
      <h1>Javobgarlar</h1>
      <Link to={"/userc/"} className="btn btn-success">
        {" "}
        Create user
      </Link>

      <Link to={"/home"} className="btn btn-primary">
        {" "}
        Home
      </Link>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Email</th>
            <th>Read</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td key={index}>{item.username} </td>
              <td>{item.email}</td>
              <td>
                <Link
                  to={`/users/${item.id}`}
                  className="btn btn-outline-primary"
                >
                  Read
                </Link>
              </td>
              <td>
                <Link
                  to={`/useru/${item.id}`}
                  className="btn btn-outline-success"
                >
                  Update
                </Link>
              </td>
              <td>
                <Button
                  variant="outline-danger"
                  onClick={(e) => onDelete(item.id)}
                >
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

export default ListUsers;
