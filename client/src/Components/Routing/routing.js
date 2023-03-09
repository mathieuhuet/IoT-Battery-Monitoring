import React,{ useEffect } from 'react';
import './routing.css'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login/login';
import User from './User/user';
import Main from './Main/main'
import List from './List/list'
import AddDevice from './AddDevice/addDevice'
import DeviceDetails from './DeviceDetails/deviceDetails';
import Monitoring from './Monitoring/monitoring';

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
          path="/monitoring" 
          element={<Monitoring />} 
        />
        <Route 
          path="/device/:prev/:id" 
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