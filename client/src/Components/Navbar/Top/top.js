import './top.css';
import { AiOutlineHome } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { VscListUnordered } from "react-icons/vsc";
import { VscGraphLine } from "react-icons/vsc";
import React from 'react';
import { Link } from 'react-router-dom';

function Top({ isAuthenticated }) {
  if (isAuthenticated) {
    return (
      <div className="Top">
        <Link to="/">
          <div className="Home">
            <AiOutlineHome />
          </div>
        </Link>
        <Link to="/devices">
          <div className="Devices">
            <VscListUnordered />
          </div>
        </Link>
        <Link to="/add">
          <div className="Add">
            <BiAddToQueue />
          </div>
        </Link>
        <Link to="/settings">
          <div className="Setting">
            <VscGraphLine />
          </div>
        </Link>
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
          <VscGraphLine />
        </div>
      </div>
    );
  }
}

export default Top;