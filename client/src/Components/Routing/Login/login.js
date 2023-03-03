import './login.css'
import React, { useState } from 'react';
import auth from '../../../Utilities/auth';
import loginServiceJWT from '../../../Services/loginServiceJWT';
import { useNavigate } from 'react-router-dom';

const initialStateLogin = {
  email: '',
  password: '',
};

const initialStateRegister = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const Login = (props) => {
  let navigate = useNavigate();
  const [stateLogin, setStateLogin] = useState(initialStateLogin);

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setStateLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitLogin = async (e) => {
    // Check the session branch to see how to handle redirects
    e.preventDefault();
    const { email, password } = stateLogin;
    const user = { email, password };
    const res = await loginServiceJWT.login(user);

    if (res.error) {
      alert(`${res.message}`);
      setStateLogin(initialStateLogin);
    } else {
      const accessToken = res.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/'));
    }
  };

  const validateFormLogin = () => {
    return !stateLogin.email || !stateLogin.password;
  };

  const [stateRegister, setStateRegister] = useState(initialStateRegister);

  const handleChangeRegister = (e) => {
    const { name, value } = e.target;
    setStateRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitRegister = async (e) => {
    // Check the client-session to see how to handle redirects
    e.preventDefault();
    const { email, password, firstName, lastName } = stateRegister;
    const user = { email, password, firstName, lastName };
    const res = await loginServiceJWT.register(user);

    if (res.error) {
      alert(`${res.message}`);
      setStateRegister(initialStateRegister);
    } else {
      const accessToken = res.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      props.setIsAuthenticated(true);
      auth.login(() => navigate('/'));
    }
  };

  const validateFormRegister = () => {
    return (
      !stateRegister.email || !stateRegister.password || !stateRegister.firstName || !stateRegister.lastName
    );
  };



  return (
    <div className='Login'>
      <div className='LoginSection'>
      <br />
        <h3>Please LogIn to access this website.</h3>
        <form className="LoginForm" onSubmit={handleSubmitLogin}>
          <div className='LoginInput'>
            <input
              type="text"
              placeholder="name@mail.com"
              name="email"
              value={stateLogin.email}
              onChange={handleChangeLogin}
            />
            <input
              type="password"
              placeholder="password"
              name="password"
              value={stateLogin.password}
              onChange={handleChangeLogin}
            />
            <button className="form-submit" type="submit" disabled={validateFormLogin()}>
              Login
            </button>
          </div>
        </form>
      </div>
      <div className='RegisterSection'>
        <div className='RegisterTitle'>
          <h3>Don't have an account?</h3>
          <h3>You can create one by filling this form.</h3>
        </div>
        <form className="Registerform" onSubmit={handleSubmitRegister}>
          <input
            type="text"
            placeholder="name@mail.com"
            name="email"
            value={stateRegister.email}
            onChange={handleChangeRegister}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            value={stateRegister.password}
            onChange={handleChangeRegister}
          />
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={stateRegister.firstName}
            onChange={handleChangeRegister}
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={stateRegister.lastName}
            onChange={handleChangeRegister}
          />
          <button className="form-submit" type="submit" disabled={validateFormRegister()}>
            Register
          </button>
        </form>
      </div>
    </div>

  );
};

export default Login;
