import React, { useEffect, useState } from "react";
import { Button, Table, Form, Modal } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { URL_USERS } from "../Path";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import { asosfile} from '../PDF/UploadandView';
import {
  FaFolder,
  FaFile,
  FaTrash,
  FaDownload,
  FaUpload,
} from "react-icons/fa";

import OpenFolder from './OpenFolder';

function CreateTask() {
  //  ############################################################
  const [users, setUsers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [firstSelect, setFirstSelect] = useState(""); // State for first dropdown
  const [secondOptions, setSecondOptions] = useState([]); // Options for second dropdown
  const [secondSelect, setSecondSelect] = useState(""); // State for second dropdown
  const [fileasos, setFileAsos] = useState(null); // asos file
  
  const [filebuyruq, setFileBuyruq] = useState(null); // buyruq file
  const [selectedFolder, setSelectedFolder] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [tree, setTree] = useState([]);
  
  
  const [filenames, setFilenames] = useState([]);

  
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setItem({ ...item, created_at: date });
    // console.log("Selected DateTime:", date);
  };

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
    axios.get(`${URL_USERS}` + "pdfs/").then((res) => {
      setFilenames(res.data);
      // console.log(res.data)
          });
  }, []);

  
  const list_status = ["Jarayonda", "Tugatildi", "Toxtatildi", "Boshlanmadi"];
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
 
  // const name = selectedItem ? selectedItem : "empty";
  // const name = test ? test : "empty";
  
  // console.log(name)
  // const name = "empty";
  // const asfile = localStorage.getItem("file") || "";
  // const name = asfile.replace(/.*[\/\\]/, "");
  const [item, setItem] = useState({
    hujjat_id: "",
    hujjat_turi: "",
    buyruq_pdf: "",
    created_at: "",
    mazmuni: "",
    xodim_soni: 0,
    status: "",
    izoh: "",
    filename: "",
    owner_id: "",
  });



  const openAsosfile = () => {

    window.open('/pdf', '_blank');
    // navigate("/taskc");
    
  }
  // window.location.reload();
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

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    setFileBuyruq(selectedFile);

    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
    const filename = event.target.value;
    const name = filename.replace(/.*[\/\\]/, "");
    setFileBuyruq(event.target.value);
    setItem({ ...item, buyruq_pdf: name });
  };

  const asosFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    // const selectedFile = event.target.value;
    setFileAsos(selectedFile);

    if (selectedFile) {
      const fileUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(fileUrl);
    }
    const filenamee = event.target.value;
    const name = filenamee.replace(/.*[\/\\]/, "");
    setFileAsos(event.target.value);
    setItem({ ...item, filename: name });
  };

  const handleChange = (e) => {
    // window.location.reload();
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
    setItem({ ...item, hujjat_turi: selectedValue });
  };
  const handleSecondSelectChange = (e) => {
    setSecondSelect(e.target.value);
    setItem({ ...item, mazmuni: e.target.value });
  };
 

  // const addFolder = async () => {
  //   const parentName = prompt("Diskni kiriting:");
  //   const folderName = prompt("Yangi papka nomini kiriting:");
  //   if (!folderName) return;

  //   await axios.post(
  //     `${URL_USERS}` +
  //       `create-folder/?parent_path=${parentName}` +
  //       `&folder_name=${folderName}`
  //   );

  // };
  // const fetchFolders = async () => {
  //   // const res = await axios.get(`${URL_USERS}` + "list-folders/");
  //   // setTree(res.data.tree);
  //   return (
  //     window.alert("Papka tanlandi"),
  //     setSelectedFolder("Papka tanlandi"),
  //     console.log("Papka tanlandi")
  //   );
  // };
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
                  <th>hujjat_id</th>
                  <th>hujjat_turi</th>
                  <th>buyruq_pdf</th>
                  <th>created_at</th>
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
                    <input
                      type="text"
                      name="hujjat_id"
                      value={item.hujjat_id}
                      onChange={handleChange}
                    />
                  </td>
                  <td>
                    <select
                      name="hujjat_turi"
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
                    <div className="folder-actions">
                      <input
                        type="file"
                        onChange={handleFileSelect}
                        name="buyruq_pdf"
                      />
                    </div>
                   
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
                  <th>Asos</th>
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
                  <Form.Select
                      aria-label="Default select example"
                      onChange={handleChange}
                      name="filename"
                    >
                  <option >
                        -- Quyidagilardan birini tanlang --
                      </option>
                      {filenames.map((item) => (
                        <option key={item} value={item.filename}>
                          {item.filename}
                        </option>
                      ))}
                 </Form.Select>
                    {/* <div className="folder-actions">

                      <input
                        type="file"
                        onChange={asosFileSelect}
                        name="filename"
                      />
                    </div> */}
                    {/* <input
                      type="text"
                      name="asos_id"
                      value={item.asos_id}
                      onChange={handleChange}
                    /> */}
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
