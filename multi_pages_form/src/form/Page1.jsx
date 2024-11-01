import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page1.css'; // Import the CSS file

function Page1({ formData, handleChange }) {
  const navigate = useNavigate();

  return (
    <div className="page1">
      <h2>Personal Information</h2>
      <label>
        First Name:
        <input 
          type="text" 
          name="firstName" 
          value={formData.firstName} 
          onChange={handleChange} 
        />
      </label>
      <label>
        Last Name:
        <input 
          type="text" 
          name="lastName" 
          value={formData.lastName} 
          onChange={handleChange} 
        />
      </label>
      <div className="navigation">
        <button onClick={() => navigate('/page2')}>Next</button>
      </div>
    </div>
  );
}

export default Page1;
