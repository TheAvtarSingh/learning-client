import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom';

function Dashboard() {
   const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
    
        if (!token) {
          
          navigate('/login');
        }
      }, [navigate]);
  return (
    <>
   <h1>Dashboard</h1>
    </>
  )
}

export default Dashboard