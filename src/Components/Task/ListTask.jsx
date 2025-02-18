import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { URL_USERS } from "../Path";
import { Link } from "react-router-dom";
import { tr } from "date-fns/locale";
import * as XLSX from "xlsx";
const useExcelExport = () => {
  const exportToExcel = (data, fileName = "data.xlsx") => {
    // Convert data to a worksheet
    const ws = XLSX.utils.json_to_sheet(data);
    
    // Create a workbook and append the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Write file
    XLSX.writeFile(wb, fileName);
  };

  return { exportToExcel };
};


function ListTasks() {
  const [items, setItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [test, setTest] = useState([]);
  const { exportToExcel } = useExcelExport();
  useEffect(() => {
    axios
      .get(`${URL_USERS}` + "users/", {
        "Content-Type": "application/json",
      })
      .then((response) => {
        setUsers(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${URL_USERS}` + "tasks/", {
        "Content-Type": "application/json",
      })
      .then((response) => {
        setItems(response.data);
        // console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const onDelete = (id) => {
    const confirm = window.confirm("Would you like to DELETE");
    if (confirm) {
      axios.delete(`${URL_USERS}` + "taskd/" + id + "/").then((res) => {
        // navigator("/users")
        window.location.reload();
      });
    }
  };

  const onEdit = () => {
    console.log("edit");
  };

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);
  

  return (
    <div>
      <h3>Topshiriqlar ro'yhati</h3>
      <Link to={"/taskc/"} className="btn btn-success">
        {" "}
        Create task
      </Link>

      <Link to={"/home"} className="btn btn-primary">
        {" "}
        Home
      </Link>
      <Link onClick={() => exportToExcel(items, "myData.xlsx")} className="btn btn-info">
        {" "}
        To excel
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
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
            {/* <th>Read</th> */}
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        {users.map((user) => (
          <tbody>
            <td>{user.username}</td>
            {user.tasks.map((task) => (
              <tr>
                <td>{task.id}</td>
                <td>{task.turi}</td>
                <td>{task.asos}</td>
                <td>{task.buyruq}</td>
                <td>{task.created_at}</td>
                <td>{task.mazmuni}</td>
                <td>{task.xodim_soni}</td>
                <td>{task.status}</td>
                <td>{task.izoh}</td>
                <td>{task.link}</td>
                <td>{task.link_kimda}</td>
                {/* <td>
                  <Link
                    to={`/tasks/${task.id}`}
                    className="btn btn-outline-primary"
                  >
                    Read
                  </Link>
                </td> */}
                <td>
                  <Link
                    to={`/tasku/${task.id}`}
                    className="btn btn-outline-success"
                  >
                    Tahrirlash
                  </Link>
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={(e) => onDelete(task.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        ))}
      </Table>
    </div>
  );
}

export default ListTasks;
