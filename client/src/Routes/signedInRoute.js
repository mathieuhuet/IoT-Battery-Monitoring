// Cannot access Login or Register page when signed in
import { Route, Routes, Navigate } from 'react-router-dom';
import './routing.css';
import User from '../Pages/User/user';
import List from '../Pages/List/list';
import AddDevice from '../Pages/AddDevice/addDevice';
import Monitoring from '../Pages/Monitoring/monitoring';
import DeviceDetails from '../Pages/DeviceDetails/deviceDetails';
import Main from '../Pages/Main/main';




const SignedInRoute = () => {
  return (
    <section className="routing">
      <Routes>
        <Route
          path="/user"
          element={<User />}
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
        <Route
          path="*"
          element={<Navigate to="/" replace={true} />}
        />
      </Routes>
    </section>
  )
}

export default SignedInRoute;