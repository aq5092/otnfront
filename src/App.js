import { Route, BrowserRouter, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListUsers from './Components/Users/List';
import CreateUser from './Components/Users/Create';

import Read from './Components/Users/Read';
import Update from './Components/Users/Update';
import CreateTask from './Components/Task/CreateTask';
import ListTasks from './Components/Task/ListTask';
import ReadTask from './Components/Task/ReadTask';
import UpdateTask from './Components/Task/UpdateTask';
import Login from './Components/Login';
import Upload from './Components/PDF/Upload';
import FolderTree from './Components/PDF/FolderTree';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/users" element={<ListUsers />} />
        <Route path="/users/:id" element={<Read />} />
        <Route path="/useru/:id" element={<Update />} />
        <Route path="/userc" element={<CreateUser />} />
        <Route path="/taskc" element={<CreateTask/>}/>
        <Route path="/tasks" element={<ListTasks/>}/>
        <Route path="/tasks/:id" element={<ReadTask />} />
        <Route path="/tasku/:id" element={<UpdateTask/>}/>
        {/* <Route path="/pdf" element={<Upload/>}/> */}
        <Route path="/pdf" element={<FolderTree/>}/>

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
