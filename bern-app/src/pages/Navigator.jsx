import React from 'react'
import {Link} from 'react-router-dom'

const Navigator = () => {
  return (
    <header>
      <div className="logo">TO DO 3.0</div>
      <nav>
        <ul>
          <li>
            <Link className="nav_link" to="/view-all-tasks">
              View All Tasks
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/create">
              Create Task
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/view">
              View Task
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/update">
              Update Task
            </Link>
          </li>
          <li>
            <Link className="nav_link" to="/delete">
              Delete Task
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navigator
