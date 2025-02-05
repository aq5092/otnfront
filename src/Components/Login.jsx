import React, { createContext, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Login() {
  const users = [
    { username: "admin", password: "admin123" },
    { username: "user1", password: "password1" },
    { username: "user2", password: "password2" },
  ];
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null); // Foydalanuvchi holati
  const navigate = useNavigate();

  // Login funksiyasi
  const login = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      navigate("/home");
      // console.log('ok')
    }
    console.log("not");
    return false; // Login muvaffaqiyatsiz
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError("Login yoki parol noto'g'ri!");
    } else {
      console.log("test");
    }
  };

  return (
    <div
      className="modal"
      // style={{ display: "block", position: "initial" }}
      style={{
        display: "block",
        position: "initial",

        // backgroundColor: "#51e2f5",

        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton className="mymodel title">
          <Modal.Title>Admin Panel Login</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleLogin} className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Login"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <input
              type="password"
              placeholder="Parol"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-2 rounded"
              required
            />
            {error && <p className="text-red-500">{error}</p>}
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="secondary" type="submit">Login</Button>
          
        </Modal.Footer> */}
      </Modal.Dialog>
    </div>
  );
}

export default Login;
