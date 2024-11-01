import React, { useState } from 'react';
import './ProjectStaffForm.css';

const ProjectStaffForm = () => {
  const [staffList, setStaffList] = useState([]);

  const addStaff = () => {
    setStaffList([...staffList, { 
      name: '', 
      numberOfPost: 0, 
      salaryPerHead: 0, 
      totalSalary: 0, 
      totalAmount: 0 
    }]);
  };

  const updateStaff = (index, field, value) => {
    const updatedStaff = [...staffList];
    updatedStaff[index][field] = value;

    if (field === 'numberOfPost' || field === 'salaryPerHead') {
      const numberOfPost = field === 'numberOfPost' ? value : updatedStaff[index].numberOfPost;
      const salaryPerHead = field === 'salaryPerHead' ? value : updatedStaff[index].salaryPerHead;
      updatedStaff[index].totalSalary = numberOfPost * salaryPerHead;
      updatedStaff[index].totalAmount = updatedStaff[index].totalSalary;
    }

    setStaffList(updatedStaff);
  };

  const deleteStaff = (index) => {
    const updatedStaff = staffList.filter((_, i) => i !== index);
    setStaffList(updatedStaff);
  };

  const calculateTotal = (field) => {
    return staffList.reduce((total, staff) => total + (staff[field] || 0), 0);
  };

  return (
    <div className="project-staff-form">
      <table className="staff-table">
        <thead>
          <tr>
            <th>Name of the post</th>
            <th>Number of post</th>
            <th>Salary per head (INR)</th>
            <th>Total salary (INR)</th>
            <th>Total amount (INR)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={staff.name}
                  onChange={(e) => updateStaff(index, 'name', e.target.value)}
                  placeholder="Enter post name"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={staff.numberOfPost}
                  onChange={(e) => updateStaff(index, 'numberOfPost', parseInt(e.target.value, 10))}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={staff.salaryPerHead}
                  onChange={(e) => updateStaff(index, 'salaryPerHead', parseFloat(e.target.value))}
                />
              </td>
              <td>{staff.totalSalary.toFixed(2)}</td>
              <td>{staff.totalAmount.toFixed(2)}</td>
              <td>
                <button 
                  className="delete-btn"
                  onClick={() => deleteStaff(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr className="total-row">
            <td colSpan={3} className="total-label">Total:</td>
            <td className="total-value">{calculateTotal('totalSalary').toFixed(2)}</td>
            <td className="total-value">{calculateTotal('totalAmount').toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <button 
        className="add-staff-btn"
        onClick={addStaff}
      >
        Add staff
      </button>
    </div>
  );
};

export default ProjectStaffForm;