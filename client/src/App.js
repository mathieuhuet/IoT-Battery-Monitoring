import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import auth from './Utilities/auth';
import Navbar from './Components/Navbar/navbar';
import Routing from './Components/Routing/routing';

function App() {
  const initialState = auth.isAuthenticated();
  const [isAuthenticated, setIsAuthenticated] = useState(initialState);


  return (
    <div className="App">
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Routing setIsAuthenticated={setIsAuthenticated} />
      </Router>
    </div>
  );
}

export default App;
