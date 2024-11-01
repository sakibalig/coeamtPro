import React from 'react';
import './Navbar.css';
import iitkgpicon from '../Assets/iitkgpicon.jpg';
import mainlogo from  '../Assets/mainlogo.png'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="main-logo">
               <img src={mainlogo} alt="main-logo" style={{ width: '50px', height: 'auto',paddingRight : '20px' }}/>
        </div>
        <h1 className="navbar-title">
          <span className="tilted-i">i</span>Pm
        </h1>
        <h2 className="navbar-subtitle">intelligent Project management</h2>
      </div>

      <div className="image-content">
      <img src={iitkgpicon} alt="iit kgp logo"/>
      </div>
      
    </nav>
  );
};

export default Navbar;

