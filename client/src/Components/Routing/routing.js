import React from 'react';
import './routing.css'
import { Routes, Route } from 'react-router-dom';
import Register from './Register/register';
import Login from './Login/login';
import Logout from './Logout/logout';
import Main from './Main/main'
import Task from './Task/task'
import AddDevice from './AddDevice/addDevice'
import Settings from './Settings/settings'

const Routing = ({ setIsAuthenticated }) => {
  return (
    <section className="routing">
      <Routes>
        <Route
          path="/register"
          element={<Register setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/devices"
          element={<Task />}
        />
        <Route 
          path="/add" 
          element={<AddDevice />} 
        />
        <Route 
          path="/settings" 
          element={<Settings />} 
        />
        <Route 
          path="/" 
          element={<Main />} 
        />
      </Routes>
    </section>
  );
};

export default Routing;