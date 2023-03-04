import React,{ useEffect } from 'react';
import './routing.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login/login';
import User from './User/user';
import Main from './Main/main'
import List from './List/list'
import AddDevice from './AddDevice/addDevice'
import DeviceDetails from './DeviceDetails/deviceDetails';
import Settings from './Settings/settings'

const Routing = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [navigate, isAuthenticated])
  return (
    <section className="routing">
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/user"
          element={<User setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/devices"
          element={<List />}
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
          path="/device/:id" 
          element={<DeviceDetails />} 
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