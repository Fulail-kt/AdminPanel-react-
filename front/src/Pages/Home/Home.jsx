import React, {useState, useEffect } from 'react';
import Cards from '../../Components/Cards/Cards';
import Navbar from '../../Components/Navbar/Navbar';
import { useNavigate,useLocation } from 'react-router-dom';
import Spinner from '../../Components/Spinner/Spinner';

function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const userLogin=location.state && location.state.userLogin
  useEffect(() => {
    if (!token) {
      navigate('/login', { replace: true });
    }

    if (userLogin) {

      console.log(userLogin)

     

    }
  }, [token,userLogin]);

  return (
    <>
      {token ? (
        <>
          <Navbar />
          <Cards />
          
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
  
}

export default HomePage;
