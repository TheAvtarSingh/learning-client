import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import '../navbar/navbar.css';
import { useTheme } from '../../context/ThemeContext';

function NavbarComponent({isLogged = false}) {
  // const [darkMode, setDarkMode] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  // const toggleDarkMode = () => {
  //   setDarkMode(!darkMode);
  // };

  const navStyle = {
    background: darkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    padding: '10px',
 
    position: 'sticky',
    top: '0',
    zIndex: '1',
  };


  const token = localStorage.getItem('token');
  
  const expireToken = () => {
    localStorage.removeItem('token');
    isLogged = false;
  }
 



  return (
    <nav className={`d-flex align-items-center justify-content-between pt-3 pb-3 ${darkMode ? ' ' : ''}`} style={navStyle}>
      <div className='d-flex align-items-center'>
      
      <Link to="/">   <img src={logo} alt="logo" style={{ marginRight: '20px' }} /> </Link>
      <Link to="/" style={{ textDecoration: 'none' }}>  <h5 className="m-0 " style={{ color: darkMode ? 'white' : 'black' }}>Learnify.com</h5> </Link>
      
       
      </div>
      <div className='d-flex align-items-center'>
        <div className="menu-items">
          <form action="" method="get" className='d-flex'>
          <input type='text' className='form-control' placeholder='Search Course' style={{ backgroundColor: darkMode ? 'dark' : 'white',marginRight:"40px" ,width:"50vw",borderRadius : "20px"}} />
          <button type='submit' className='btn' style={{ width: '9vw', backgroundColor: darkMode ? 'dark' : 'white' ,marginLeft:"2px",border: "0.01px solid black",borderRadius:"20px"}}>
            <i className={`bi ${darkMode ? 'bi-search' : 'bi-search'}`}></i>
          </button>
          </form>
        </div>
     
        <Link to={(token && isLogged) ? "/login" : "/dashboard-user"} onClick={(token && isLogged)? expireToken: null} >  <button type='submit' className={`btn ${darkMode ? 'btn-primary shadow-lg bg-body-light': 'btn-light'}`} style={{ marginLeft: '10px' }}>  {isLogged?  "Logout" : "Login"}</button></Link>
       
        <Link to="/learning-options">  <button type='submit' className={`btn ${darkMode ? 'btn-light' : 'btn-primary'}`} style={{ marginLeft: '10px' }}>Try Now</button></Link>
       
      </div>
     
      <i onClick={toggleDarkMode} style={{ color: darkMode ? 'white' : 'black', marginLeft: '7px' }} className={`bi ${darkMode ? 'bi-sun-fill' : 'bi-moon-fill'}`}></i>
    </nav>
  );
}

export default NavbarComponent;
