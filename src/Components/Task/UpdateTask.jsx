import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { URL_USERS } from "../Path";
import { Button, Table } from "react-bootstrap";

function UpdateTask() {
  const { id } = useParams();
  const [item, setItem] = useState({
    turi: "",
    asos: "",
    buyruq: "",
    created_at: "",
    mazmuni: "",
    xodim_soni: 0,
    status: "",
    izoh: "",
    link: "",
    link_kimda: "",
    owner_id: "",
  });
  // const handleDateChange = (date) => {
  //   setSelectedDate(date);
  //   setItem({ ...item, created_at: date });
  //   console.log("Selected DateTime:", date);
  // };

  const navigate = useNavigate();
  const numericId = Number(id); // Explicitly convert to a number
  const result = numericId;

  useEffect(() => {
    axios
      .get(`${URL_USERS}` + "task/" + result)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handelUpdate = (event) => {
    event.preventDefault();
    // console.log(values.data)
    axios
      .put(`${URL_USERS}` + "tasku/" + result, item)
      .then((res) => {
        console.log(res);
        navigate("/tasks");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  return (
    <div className="updatetask">
      {/* <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light ">
      <div className="w-150 border bg-white shadow px-5 pt-3 pb-5 rounded"> */}
      <h3>Update Task</h3>
      <form onSubmit={handelUpdate}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Topshiriq turi</th>
              <th>Asos</th>
              <th>Buyruq raqami</th>
              <th>Sana</th>
              <th>Mazmuni</th>
              <th>Xodimlar soni</th>
            </tr>
            <tr>
              <td>{item.id}</td>
              <td>
                <input
                  type="text"
                  name="turi"
                  value={item.turi}
                  onChange={(e) => setItem({ ...item, turi: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="asos"
                  value={item.asos}
                  onChange={(e) => setItem({ ...item, asos: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="buyruq"
                  value={item.buyruq}
                  onChange={(e) => setItem({ ...item, buyruq: e.target.value })}
                />
              </td>
              <td>
                {" "}
                <input
                  type="text"
                  name="created_at"
                  value={item.created_at}
                  onChange={(e) =>
                    setItem({ ...item, created_at: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  name="mazmuni"
                  value={item.mazmuni}
                  onChange={(e) =>
                    setItem({ ...item, mazmuni: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  name="xodim_soni"
                  value={item.xodim_soni}
                  onChange={(e) =>
                    setItem({ ...item, xodim_soni: e.target.value })
                  }
                />
              </td>
            </tr>
            <br />
            <br />
            <tr>
              <th>Status</th>
              <th>Izoh</th>
              <th>Link</th>
              <th>Link_kimda</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="text"
                  name="status"
                  value={item.status}
                  onChange={(e) => setItem({ ...item, status: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="izoh"
                  value={item.izoh}
                  onChange={(e) => setItem({ ...item, izoh: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="link"
                  value={item.link}
                  onChange={(e) => setItem({ ...item, link: e.target.value })}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="link_kimda"
                  value={item.link_kimda}
                  onChange={(e) =>
                    setItem({ ...item, link_kimda: e.target.value })
                  }
                />
              </td>
              <td>
                <Button type="submit" variant="outline-danger">
                  Submit
                </Button>
              </td>
              <td>
                <Link to="/tasks" className="btn btn-info">
                  Back
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </form>
    </div>
    //   </div>
    // </div>
  );
}

export default UpdateTask;
