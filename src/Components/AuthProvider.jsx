import React, { createContext, useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// 1. Foydalanuvchi ma'lumotlari
const users = [
  { username: "admin", password: "admin123" },
  { username: "user1", password: "password1" },
  { username: "user2", password: "password2" },
];

// 2. AuthContext yaratish
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // Foydalanuvchi holati

  // Login funksiyasi
  const login = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      setCurrentUser(user);
      return true; // Muvaffaqiyatli login
    }
    return false; // Login muvaffaqiyatsiz
  };

  // Logout funksiyasi
  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook
const useAuth = () => useContext(AuthContext);

// 3. PrivateRoute komponenti
const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

// 4. LoginPage komponenti
const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const success = login(username, password);
    if (!success) {
      setError("Login yoki parol noto'g'ri!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Admin Panel Login</h1>
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
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// 5. Dashboard komponenti
const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl mb-4">Xush kelibsiz, {currentUser?.username}!</h1>
      <button
        onClick={logout}
        className="bg-red-500 text-white py-2 px-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};
