// src/App.tsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './components/Dashboard';
import { RootState, useAppDispatch } from './app/store';
import { getAllProduct } from './redux/api/productApi';
import { useSelector } from 'react-redux';
import UpdateProduct from './components/UpdateProduct';

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const product = useSelector((state:RootState) => state.product);
  useEffect(() => {
    // (async () => {
    //   const res = await dispatch(getAllProduct());
    //   if(res.payload){
    //     setIsAuthenticated(true);
    //   }
    // }
    // )();
    console.log(localStorage.getItem('token'));
    localStorage.getItem('token') ? setIsAuthenticated(true) : setIsAuthenticated(false);
  }
  , [dispatch]);

  return (
    <Router>
      <Routes>
      <Route path="/" element={isAuthenticated ? <Dashboard /> : <Login />} />
        {isAuthenticated ? (
          <Route path="/dashboard" element={<Dashboard />} />
        ) : (
          <Route path="/login" element={<Login />} />
        ) }
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/update/:id' element={<UpdateProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
