import React from 'react'

import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>
        Example heading
        </h1>
        <Link to={`/userl/`} className="btn btn-outline-primary">+ User</Link>

    </div>

  )
}

export default Home
