import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { URL_USERS } from "../Path";
function Update() {
  const { id } = useParams();
  const [item, setItem] = useState({
          username: '',
          email: '',
          password: ''
      })

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL_USERS}`+ 'users/' + id)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  },[]);
    const numericId = Number(id); // Explicitly convert to a number
    const result = numericId - 1
const handelUpdate = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch(`${URL_USERS}`+ 'useru/'+ result, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(item),
          })
           navigate("/users");
             
          const data = await response.json();
          console.log("Response from server:", data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setItem({ ...item, [name]: value });
      };
//   const handelUpdate = (event) => {
//     event.preventDefault();
//     // console.log(values.data)
//     axios
//       .put(`${URL_USERS}`+ 'useru/' + id, values)
//       .then((res) => {
//         console.log(res);
//         navigate("/users");
//       })
//       .catch(res=> {
//         console.log(res)
//     });
//   };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light ">
      <div className="w-150 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update User</h1>
        <form onSubmit={handelUpdate}>
          <div className="mb-2">
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              name="username"
              value={item.username}
              onChange={(e) => setItem({ ...item, username: e.target.value })}
            />
          </div>
         
          <div className="mb-2">
            <label htmlFor="email">Email: </label>
            <input
              type="text"
              name="email"
              value={item.email}
              onChange={(e) => setItem({ ...item, email: e.target.value })}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password">Password: </label>
            <input
              type="text"
              name="password"
              value={item.password}
              onChange={(e) =>
                setItem({ ...item, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/users" className="btn btn-info">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Update;