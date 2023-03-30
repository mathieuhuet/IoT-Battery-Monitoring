const API = process.env.REACT_APP_API_URL
? process.env.REACT_APP_API_URL
: 'http://localhost:3030';

/*
Login service.
Register, Login, Logout, Profile
*/

const loginServiceJWT = {};

loginServiceJWT.register = (user) => {
  return fetch(`${API}/register`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

loginServiceJWT.login = (user) => {
  return fetch(`${API}/login`, {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

loginServiceJWT.profile = async (accessToken) => {
  try {
    const get = await fetch(`${API}/me`, {
      method: 'GET',
      credentials: 'include',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    })
    const response = await get.json();
    if (response.error) {
      throw new Error(response.message);
    }
    return response.data;
  } catch (error) {
    console.log(`ERROR AT getEvents services function : ${error}`);
  }
};

loginServiceJWT.logout = (tokenName) => {
  // delete token from local storage here
  localStorage.removeItem(tokenName);
};

export default loginServiceJWT;
