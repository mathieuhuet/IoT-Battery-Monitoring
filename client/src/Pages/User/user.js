import './user.css'
import React, { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import loginServiceJWT from '../../Services/loginServiceJWT';
import { Link } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
};

/*
User Page.

It only display the name of the user.

Also the page where you would logout.
*/


const User = () => {
  const [cookies, setCookie] = useCookies(['userToken']);
  //Logout section
  const handleClick = () => {
    loginServiceJWT.logout('accessToken');
    setCookie('userToken', '', {secure: false, path: '/', });
  };

  //Profile section
  const [state, setState] = useState(initialState);

  const firstName = state.firstName || '';
  const lastName = state.lastName || '';

  useEffect(() => {
    const accessToken = cookies.userToken;
    const getProfile = async (accessToken) => {
      const userInfo = await loginServiceJWT.profile(accessToken);
      if (userInfo) {
        const { firstName, lastName } = userInfo;
        setState((prevState) => {
          return {
            ...prevState,
            firstName,
            lastName,
          };
        });
      } else {
        console.log('No user info found 😞');
      }
    };
    getProfile(accessToken);
  }, [cookies.userToken]);

  return (
    <div className='AppContainer'>
      <div className='User'>
      <section className='Profile'>
        <h3>My Profile</h3>
        <h3>
          Welcome, {firstName} {lastName}!
        </h3>
      </section>
      <section className='Logout'>
        <h3>Do you want to log out?</h3>
        <button className="confirm-btn" onClick={() => handleClick()}>
          Yes
        </button>
        <Link to="/">
          <button className="confirm-btn">No</button>
        </Link>
      </section>
    </div>
    </div>
  );
};

export default User;
