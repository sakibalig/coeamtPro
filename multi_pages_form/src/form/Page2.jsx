import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page2.css'; // Import the CSS file

function Page2({ formData, handleChange }) {
  const navigate = useNavigate();

  return (
    <div className="page2">
      <h2>Contact Information</h2>
      <label>
        Email:
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
        />
      </label>
      <label>
        Phone Number:
        <input 
          type="text" 
          name="phoneNumber" 
          value={formData.phoneNumber} 
          onChange={handleChange} 
        />
      </label>
      <div className="navigation">
        <button onClick={() => navigate('/page1')}>Previous</button>
        <button onClick={() => navigate('/page3')}>Next</button>
      </div>
    </div>
  );
}

export default Page2;
