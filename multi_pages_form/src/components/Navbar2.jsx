import React from "react";
import "./Navbar2.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/user";
import logoutimg from "../Assets/logout.png";
import plusicon from "../Assets/plusicon.png";
import projectm from "../Assets/projectmonitoring longo.png";
import add from "../Assets/plusicon.png"


const Navbar2 = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  console.log(user);

  const fullName = user.FirstName + " " + user.LastName;

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://ipmproject.onrender.com/api/v1/user/logout");
      console.log(response);
      if (response.status === 204) {
        logout();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const ProjectRegistration = () => {
    navigate("/project-registration");
  };

  const ProjectMonitoring = () => {
    navigate("/project-monitoring/project-dashboard");
  };

  const goToAdmin = () => {
    navigate("/register"); // Change this to the actual admin route
  };

  return (
    <nav className="navbar2">
      <div className="navbar2-buttons">
        <button className="navbar2-button" onClick={ProjectRegistration}>
          <img src={plusicon} alt="plus-icon" />
          Project Registration
        </button>
        <button className="navbar2-button" onClick={ProjectMonitoring}>
          <img
            src={projectm}
            alt="projectm"
            style={{ width: "30px", height: "auto" }}
          />
          Project Monitoring
        </button>
        <button className="navbar2-button" onClick={goToAdmin}>
           <img
              src={add}
              alt="logout image"
              style={{ width: "30px", height: "auto" }}
            />
          Usdfser/Admin
        </button>
        <button className="navbar2-button" onClick={goToAdmin}>
           <img
              src={add}
              alt="logout image"
              style={{ width: "30px", height: "auto" }}
            />
          User/Admin
        </button>
      </div>
      <div className="navbar2-right">
        <h3 className="navbar2-welcome">Welcome {fullName}</h3>
        <button className="navbar2-logout-button" onClick={handleLogout}>
          <div>
            <img
              src={logoutimg}
              alt="logout image"
              style={{ width: "30px", height: "auto" }}
            />
          </div>
        </button>
      </div>
    </nav>
  );
};

export default Navbar2;