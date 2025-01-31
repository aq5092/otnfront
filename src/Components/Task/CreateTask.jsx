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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTask() {
  //  ############################################################
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setItem({ ...item, created_at: date });
    console.log("Selected DateTime:", date);
  };

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

  const list_status = ["Jarayonda", "Tugatildi", "Toxtatildi"];
  const list_topshriq = ["Buyruq", "Xizmat xati", "Rahbar topshirigi", "Ish rejimi", "Kunlik reja"];
  
  const [item, setItem] = useState({
    turi: "",
    asos: "",
    buyruq: "",
    created_at: "",
    // updated_at: "",
    mazmuni: "",
    xodim_soni: "",
    status: "",
    izoh: "",
    link: "",
    link_kimda: "",
    owner_id: "",
  });
  const id = item.owner_id;
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
      // console.log("Response from server:", data);
      navigate("/tasks");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItem({ ...item, [name]: value });
    // setUsers({...users,[name]: value});
    // console.log(item)
  };

  return (
    <>
      <div className=" w-auto justify-content-center align-items-center bg-light ">
        <div className="w-auto border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>New task</h1>
          <form onSubmit={handleSubmit}>
            <Table striped bordered hover>
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
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange}
                      name="owner_id"
                    >
                      <option>Select user</option>
                      {users.map((user, index) => (
                        <option
                          key={index}
                          name="owner_id"
                          value={user.id}
                          onChange={handleChange}
                        >
                          {user.username}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  <td>
                  <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange}
                      name="turi"
                    >
                      <option>Select user</option>
                      {list_topshriq.map((val, index) => (
                        <option
                          key={index}
                          name="turi"
                          value={val}
                          onChange={handleChange}
                        >
                          {val}
                        </option>
                      ))}
                    </Form.Select>
                    {/* <input
                      type="text"
                      name="turi"
                      value={item.turi}
                      onChange={handleChange}
                    /> */}
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
                    <DatePicker
                      selected={selectedDate}
                      onChange={(date) => handleDateChange(date)}
                      name="created_at"
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="border rounded p-2"
                    />
                   

                    {/* <input
                      
                      type="text"
                      name="created_at"
                      value={item.created_at}
                      onChange={handleChange}
                    /> */}
                  </td>
                </tr>
                <br/>
                <br/>
                <tr>
                  {/* <th>Update sana</th> */}
                  <th>Mazmuni</th>
                  <th>Xodimlar soni</th>
                  <th>Status</th>
                  <th>Izoh</th>
                  <th>Link</th>
                  <th>Link_kimda</th>
                </tr>
                <tr>
                  {/* <td>
                    <input
                      type="text"
                      name="updated_at"
                      value={item.updated_at}
                      onChange={handleChange}
                    />
                  </td> */}
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
                    <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange}
                      name="status"
                    >
                      <option>Select status</option>
                      {list_status.map((status, index) => (
                        <option
                          key={index}
                          name="status"
                          value={status}
                          onChange={handleChange}
                        >
                          {status}
                        </option>
                      ))}
                    </Form.Select>
                  </td>
                  {/* <input
                      type="text"
                      name="status"
                      value={item.status}
                      onChange={handleChange}
                    /> */}
                  {/* </td> */}
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
