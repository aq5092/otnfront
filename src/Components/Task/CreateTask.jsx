import React, { useEffect, useState } from "react";
import { Button, Table, Form } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL_USERS } from "../Path";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CreateTask() {
  //  ############################################################
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstSelect, setFirstSelect] = useState(""); // State for first dropdown
  const [secondOptions, setSecondOptions] = useState([]); // Options for second dropdown
  const [secondSelect, setSecondSelect] = useState(""); // State for second dropdown

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

  const list_status = ["Jarayonda", "Tugatildi", "Toxtatildi","Boshlanmadi"];
  const data = {
    Rahbar_topshirigi: [
      "Avtosanoat",
      "Mukofotlash",
      "Nizom",
      "Shtat jadvali",
      "Tashkiliy (Структура) tuzilma",
    ],
    Xizmat_xati: [
      "Boshqa ishga o'tkazish",
      "Kategoriya oshirish",
      "Tushlik puli",
      "Ustama bekor qilish",
      "Ustama belgilash",
      "Vakantlarni o‘chirish",
    ],
    Buyruq: [
      "Boshqa ishga o'tkazish",
      "Kategoriya oshirish",
      "Korxona shtat jadvali",
      "Ustama bekor qilish",
      "Ustama belgilash",
      "KPI (Korxona)",
      "KPI (Tarmoqlar)",
      "Mukofotlash",
      "Nizom",
      "Rotatsiya",
      "Shtat jadvali",
      "Tashkiliy (Структура) tuzilma",
      "Vakantlarni o‘chirish",
    ],
    Ish_rejimi: [
      "Dam olish kuni grafigi",
      "Dam olish kuni haqidagi buyruq",
      "Dam olish kuni ish tashkil qilish haqida",
      "Ish kuni grafigi",
      "Ish rejimini o`zgartirish haqida",
      "Yillik 4 komandalik ish grafigi",
      "Yillik ish taqvimi (kalendar)",
    ],
  };

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
      console.log("Response from server:", data);
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
  const handleFirstSelectChange = (e) => {
    const selectedValue = e.target.value;
    setFirstSelect(selectedValue);
    setSecondOptions(data[selectedValue] || []); // Update second dropdown options
    setSecondSelect(""); // Reset the second dropdown
    setItem({ ...item, turi: selectedValue });
  };
  const handleSecondSelectChange = (e) => {
    setSecondSelect(e.target.value);
    setItem({ ...item, mazmuni: e.target.value });
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
                    <select
                      name="turi"
                      value={firstSelect}
                      onChange={handleFirstSelectChange}
                      className="border p-2 rounded mb-4 w-full"
                    >
                      <option value="">
                        -- Quyidagilardan birini tanlang --
                      </option>
                      {Object.keys(data).map((key) => (
                        <option key={key} value={key}>
                          {key}
                        </option>
                      ))}
                    </select>
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
                  </td>
                </tr>
                <br />
                <br />
                <tr>
                  <th>Mazmuni</th>
                  <th>Xodimlar soni</th>
                  <th>Status</th>
                  <th>Izoh</th>
                  <th>Link</th>
                  <th>Link_kimda</th>
                </tr>
                <tr>
                  <td>
                    <select
                      name="mazmuni"
                      value={secondSelect}
                      onChange={handleSecondSelectChange}
                      className="border p-2 rounded w-full"
                      disabled={!firstSelect} // Disable if no selection in first dropdown
                    >
                      <option value="">
                        -- Quyidagilardan birini tanlang --
                      </option>
                      {secondOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
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
