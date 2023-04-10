// Cannot access any other page than : Login/Register
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Pages/Login/login';


const SignedOutRoute = () => {
  return (
    <Routes>
      <Route 
        path="/login" 
        element={<Login/>}
      />
      <Route
        path="*"
        element={<Navigate to="/login" replace={true} />}
      />
    </Routes>
  )
}

export default SignedOutRoute;