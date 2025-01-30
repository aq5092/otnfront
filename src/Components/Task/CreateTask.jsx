import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Modal,
  Form,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL_USERS } from "../Path";

function CreateTask() {
  const [inputValue, setInputValue] = useState("");
  const [selectedValue, setSelectedValue] = useState("");

  //  ############################################################
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL_USERS}` + "users/", {
        "Content-Type": "application/json",
      })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

  const handleSelect = (value) => {
    setInputValue(value);
    setSelectedValue(value);
  };
  const list_status = ["Jarayonda", "Tugatildi", "Toxtatildi"];
  const [item, setItem] = useState({
    turi: "",
    asos: "",
    buyruq: "",
    created_at: "",
    updated_at: "",
    mazmuni: "",
    xodim_soni: "",
    status: "",
    izoh: "",
    link: "",
    link_kimda: "",
    owner_id: "",
  });
  const id =1;
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL_USERS}` + "taskc/" + id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });

      const data = await response.json();
      console.log("Response from server:", data);
      navigate("/tasks");
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
      <div className=" w-auto justify-content-center align-items-center bg-light ">
        <div className="w-auto border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>New task</h1>
          <form onSubmit={handleSubmit}>
            <Table striped bordered hover>
              {/* <thead>
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Topshiriq turi</th>
                  <th>Asos</th>
                  <th>Buyruq raqami</th>
                  <th>Sana</th>
                  </tr>
                  <tr>
                  <th>Mazmuni</th>
                  <th>Xodimlar soni</th>
                  <th>Status</th>
                  <th>Izoh</th>
                  <th>Link</th>
                  <th>Link_kimda</th>
                </tr>
              </thead> */}
              <tbody>
                <tr>
                  <th>User</th>
                  <th>Topshiriq turi</th>
                  <th>Asos</th>
                  <th>Buyruq raqami</th>
                  <th>Sana</th>
                </tr>
                <tr>
                  
                  <td>
                    <div
                      style={{
                        maxWidth: "300px",
                        margin: "0 auto",
                        padding: "20px",
                      }}
                    >
                      <input
                      type="text"
                      name="owner_id"
                      value={inputValue}
                      onChange={handleChange}
                    />
                      {/* <Form.Control
                        type="text"
                        placeholder="Select or type..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      /> */}
                      <DropdownButton
                        id="dropdown-basic-button"
                        title="Users"
                        className="mt-8"
                        onSelect={handleSelect}
                      >
                        {users.map((option, index) => (
                          <Dropdown.Item key={index} eventKey={option.id}>
                            {option.username}
                          </Dropdown.Item>
                        ))}
                      </DropdownButton>
                      {/* {selectedValue && (
                        <p className="mt-3">Selected: {selectedValue}</p>
                      )} */}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="turi"
                      value={item.turi}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="asos"
                      value={item.asos}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    {" "}
                    <input
                      type="text"
                      name="buyruq"
                      value={item.buyruq}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="created_at"
                      value={item.created_at}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Update sana</th>
                  <th>Mazmuni</th>
                  <th>Xodimlar soni</th>
                  <th>Status</th>
                  <th>Izoh</th>
                  <th>Link</th>
                  <th>Link_kimda</th>
                </tr>
                <tr>
                  <td>
                    <input
                      type="text"
                      name="updated_at"
                      value={item.updated_at}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="mazmuni"
                      value={item.mazmuni}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="xodim_soni"
                      value={item.xodim_soni}
                      onChange={handleChange}
                    />
                  </td>

                  <td>
                    <input
                      type="text"
                      name="status"
                      value={item.status}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="izoh"
                      value={item.izoh}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="link"
                      value={item.link}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="link_kimda"
                      value={item.link_kimda}
                      onChange={handleChange}
                      placeholder="link kimda"
                    />
                  </td>
                </tr>
              </tbody>
            </Table>
            {/* <div className="mb-2">
              <label htmlFor="turi">Topshiriq turi: </label>
              <input
                type="text"
                name="turi"
                value={item.turi}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="asos">Asos: </label>
              <input
                type="text"
                name="asos"
                value={item.asos}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="buyruq">Buyruq: </label>
              <input
                type="text"
                name="buyruq"
                value={item.buyruq}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="created_at">Sana: </label>

              <input
                type="text"
                name="created_at"
                value={item.created_at}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="updated_at">Updata sana: </label>
              <input
                type="text"
                name="updated_at"
                value={item.updated_at}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="mazmuni">Mazmuni: </label>
              <input
                type="text"
                name="mazmuni"
                value={item.mazmuni}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="xodim_soni">Xodim soni: </label>
              <input
                type="text"
                name="xodim_soni"
                value={item.xodim_soni}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="status">Status: </label> */}
            {/* <DropdownButton className='mt-2' value={item.status} onChange={handleChange}>
                {list_status.map((option, index) => (
          <Dropdown.Item  eventKey={option}>
            {option}
          </Dropdown.Item>
        ))}
                </DropdownButton> */}
            {/* <input
                type="text"
                name="status"
                value={item.status}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="izoh">Izoh: </label>
              <input
                type="text"
                name="izoh"
                value={item.izoh}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="link">Link: </label>
              <input
                type="text"
                name="link"
                value={item.link}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="link_kimda">Link kimda: </label>
              <input
                type="text"
                name="link_kimda"
                value={item.link_kimda}
                onChange={handleChange}
              />
            </div>
            <div className="mb-2">
              <label htmlFor="owner_id">User id: </label>
              <input
                type="text"
                name="owner_id"
                value={item.owner_id}
                onChange={handleChange}
              />
            </div> */}
            <Button type="submit" variant="outline-danger">
              Submit
            </Button>

            <Link to="/tasks" className="btn btn-info">
              Back
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateTask;
