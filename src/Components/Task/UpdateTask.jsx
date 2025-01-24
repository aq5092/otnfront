import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { URL_USERS } from "../Path";
import { Button } from "react-bootstrap";
function UpdateTask() {
  const { id } = useParams();
  const [item, setItem] = useState({
    task_name: "",
    
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL_USERS}` + "tasks/" + id)
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  }, []);
  const numericId = Number(id); // Explicitly convert to a number
  const result = numericId ;

    const handelUpdate = (event) => {
      event.preventDefault();
      // console.log(values.data)
      axios
        .put(`${URL_USERS}`+ 'tasku/' + result, item)
        .then((res) => {
          console.log(res);
          navigate("/tasks");
        })
        .catch(res=> {
          console.log(res)
      });
    };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light ">
      <div className="w-150 border bg-white shadow px-5 pt-3 pb-5 rounded">
        <h1>Update Task</h1>
        <form onSubmit={handelUpdate}>
          <div className="mb-2">
            <label htmlFor="task_name">Taskname: </label>
            <input
              type="text"
              name="task_name"
              value={item.task_name}
              onChange={(e) => setItem({ ...item, task_name: e.target.value })}
            />
          </div>

          
          <Button type="submit" variant="outline-danger" >Submit</Button>
          <Link to="/users" className="btn btn-info">
            Back
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UpdateTask;
