import './App.css';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './Components/Navbar/navbar';
// Auth
import { useCookies } from 'react-cookie';
// Auth routes
import SignedInRoute from './Routes/signedInRoute';
import SignedOutRoute from './Routes/signedOutRoute';




function App() {
  const [cookies, setCookie] = useCookies(['userToken']);

  return (
    <div className="App">
      <Router>
        <Navbar />
        {cookies.userToken ?           
          <SignedInRoute/> :
          <SignedOutRoute/>
        }
      </Router>
    </div>
  );
}

export default App;
