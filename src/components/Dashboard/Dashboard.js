import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import NavbarComponent from "../navbar/navbar";

import "./Dashboard.css";
import Footer from "../footer/footer";
import { useTheme } from '../../context/ThemeContext';

function Dashboard() {
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="mainbar">
        <NavbarComponent isLogged={true} />
      </div>

      <div className="homepage">
        <div className="dashboardsidebar" style={{background: darkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',}}>
          <div className="profile-container">
            <div className="image-container">
              <div className="user-img"> <img src="./images/profile.png"/></div>
              <span>/username</span>
            </div>
          </div>
          <div className="sidebar-links">
          <button className="btn btn-primary mx-2 my-2">My Profile</button>
          <button className="btn btn-primary mx-2 my-2">Course Hero</button>
          <button className="btn btn-primary mx-2 my-2">Knowledge Test</button>
          <button className="btn btn-primary mx-2 my-2">AI Special</button>
          <button className="btn btn-primary mx-2 my-2">Chat With AI</button>
          <button className="btn btn-primary mx-2 my-2">Generate Content</button>
          <button className="btn btn-primary mx-2 my-2">Learn with Trainer</button>
          </div>
        </div>

        <div className="dashboardmainbar"></div>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
