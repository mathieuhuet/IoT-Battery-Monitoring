import './top.css';
import { AiOutlineHome } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { VscListUnordered } from "react-icons/vsc";
import { VscSettingsGear } from "react-icons/vsc";
import React from 'react';
import { Link } from 'react-router-dom';

function Top({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <div className="Top">
        <div className="Home">
          <Link to="/">
            <AiOutlineHome />
          </Link>
        </div>
        <div className="Devices">
          <Link to="/devices">
            <VscListUnordered />
          </Link>
        </div>
        <div className="Add">
          <Link to="/add">
            <BiAddToQueue />
          </Link>
        </div>
        <div className="Setting">
          <Link to="/settings">
            <VscSettingsGear />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="Top">
        <div className="Home">
          <AiOutlineHome />
        </div>
        <div className="Devices">
          <VscListUnordered />
        </div>
        <div className="Add">
          <BiAddToQueue />
        </div>
        <div className="Setting">
          <VscSettingsGear />
        </div>
      </div>
    );
  }
}

export default Top;