import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import NavbarComponent from '../navbar/navbar';

function Dashboard() {
   const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          navigate('/login');
        }
      }, []);
  return (
    <>
    <div className="mainbar">
      <NavbarComponent isLogged={true}  />
    </div>
   <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard