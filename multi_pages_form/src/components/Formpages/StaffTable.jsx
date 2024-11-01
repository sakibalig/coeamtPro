import React, { useState } from 'react';
import StaffForm from './ProjectStaffForm';

const StaffTable = () => {
  const [staffList, setStaffList] = useState([]);

  const handleAddStaff = (staff) => {
    setStaffList([...staffList, staff]);
  };

  const handleDelete = (index) => {
    setStaffList(staffList.filter((_, i) => i !== index));
  };

  return (
    <div>
      <table className="staff-table">
        <thead>
          <tr>
            <th>Name of the Post</th>
            <th>Number of Posts</th>
            <th>Salary per Head (INR)</th>
            <th>Total Salary (INR)</th>
            <th>Total Amount (INR)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {staffList.map((staff, index) => (
            <tr key={index}>
              <td>{staff.postName}</td>
              <td>{staff.numberOfPosts}</td>
              <td>{staff.salaryPerHead}</td>
              <td>{staff.totalSalary}</td>
              <td>{/* You can calculate and display Total Amount here if needed */}</td>
              <td>
                <button onClick={() => handleDelete(index)}>
                  <i className="fa fa-trash"></i> Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td>---Total---</td>
            <td>{staffList.reduce((acc, staff) => acc + Number(staff.numberOfPosts), 0)}</td>
            <td></td>
            <td>{staffList.reduce((acc, staff) => acc + Number(staff.totalSalary), 0)}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <StaffForm onAdd={handleAddStaff} />
    </div>
  );
};

export default StaffTable;
