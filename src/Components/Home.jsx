import React from 'react'

import { Link } from 'react-router-dom';
import DashboardNavbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';
import Select from './Task/select';
import DateTimePicker from './Task/datepicker';
function Home() {
  return (
    <div>
      <div>
      <DashboardNavbar/>
      <div className="d-flex">
        <Sidebar/>
        <div style={{ flex: 1 }}>
          <Content/>
          <Select/>
          <DateTimePicker/>
          {/* <Link to={`/users`} className="btn btn-outline-primary">Show user</Link> */}
        </div>
      </div>
    </div>
      
      

    </div>

  )
}

export default Home
