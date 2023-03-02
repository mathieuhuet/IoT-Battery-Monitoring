import './bottom.css';
import { BiUserCircle } from "react-icons/bi";
import React from 'react';
import { Link } from 'react-router-dom';

function Bottom({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <div className="Bottom">
        <div className="Users">
          <Link to='/logout'>
            <BiUserCircle />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Bottom">
        <div className="Users">
          <BiUserCircle />
        </div>
      </div>
    );
  }
}

export default Bottom;