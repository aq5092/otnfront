import React from 'react'

import { Link } from 'react-router-dom';
import DashboardNavbar from './Navbar';
import Sidebar from './Sidebar';
import Content from './Content';
function Home() {
  return (
    <div>
      <div>
      <DashboardNavbar/>
      <div className="d-flex">
        <Sidebar/>
        <div style={{ flex: 1 }}>
          <Content/>
          {/* <Link to={`/users`} className="btn btn-outline-primary">Show user</Link> */}
        </div>
      </div>
    </div>
      
      

    </div>

  )
}

export default Home
