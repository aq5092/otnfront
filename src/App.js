import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListUsers from './Components/Users/List';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<ListUsers />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
