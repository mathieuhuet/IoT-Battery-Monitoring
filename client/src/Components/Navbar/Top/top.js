import './top.css';
import { AiOutlineHome } from "react-icons/ai";
import { BiAddToQueue } from "react-icons/bi";
import { VscListUnordered } from "react-icons/vsc";
import { VscGraphLine } from "react-icons/vsc";
import React from 'react';
import { Link } from 'react-router-dom';

/*
The Four buttons to the top-left of the screen
*/



function Top() {
  return (
    <div className="Top">
      <Link to="/">
        <div className="Home">
          <AiOutlineHome />
        </div>
      </Link>
      <Link to="/monitoring">
        <div className="Monitor">
          <VscGraphLine />
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
    </div>
  );
}

export default Top;