import React from 'react';
import './Review.css'; // Import the CSS file

function Review({ formData, handleSubmit }) {
  return (
    <div className="review">
      <h2>Review Your Information</h2>
      <p><strong>First Name:</strong> {formData.firstName}</p>
      <p><strong>Last Name:</strong> {formData.lastName}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
      <p><strong>Address:</strong> {formData.address}</p>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Review;
