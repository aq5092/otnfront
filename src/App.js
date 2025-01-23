import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListUsers from './Components/Users/List';
import CreateUser from './Components/Users/Create';
import Tasks from './Components/Task/Tasks';
import Read from './Components/Users/Read';
import Update from './Components/Users/Update';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/users/:id" element={<Read />} />
        <Route path="/useru/:id" element={<Update />} />
        <Route path="/userc" element={<CreateUser />} />
        <Route path="/tasks" element={<Tasks />} />

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
