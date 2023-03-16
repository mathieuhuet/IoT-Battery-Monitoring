import './bottom.css';
import { BiUserCircle } from "react-icons/bi";
import React from 'react';
import { Link } from 'react-router-dom';

/*
The User Button at the bottom-left of the screen
*/

function Bottom({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <div className="Bottom">
        <Link to='/user'>
          <div className="Users">
            <BiUserCircle />
          </div>
        </Link>
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