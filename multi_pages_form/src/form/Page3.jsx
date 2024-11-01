import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Page3.css'; // Import the CSS file

function Page3({ formData, handleChange }) {
  const navigate = useNavigate();

  return (
    <div className="page3">
      <h2>Address Information</h2>
      <label>
        Address:
        <input 
          type="text" 
          name="address" 
          value={formData.address} 
          onChange={handleChange} 
        />
      </label>
      <div className="navigation">
        <button onClick={() => navigate('/page2')}>Previous</button>
        <button onClick={() => navigate('/review')}>Review</button>
      </div>
    </div>
  );
}

export default Page3;
