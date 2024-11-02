import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManPower.css';

const ManpowerDetails = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [manpowerDetails, setManpowerDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://ipmproject.onrender.com/api/v1/user/getAllProjects');
        setProjects(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setError('Error fetching projects. Please try again later.');
      }
    };

    fetchProjects();
  }, []);

  const fetchManpowerDetails = async (projectId) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://ipmproject.onrender.com/api/v1/user/getManpower/${projectId}`);
      setManpowerDetails(response.data.data);
    } catch (error) {
      console.error('Error fetching manpower details:', error);
      setError('Error fetching manpower details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);

    if (projectId) {
      fetchManpowerDetails(projectId);
    } else {
      setManpowerDetails(null);
    }
  };

  const calculateGrandTotal = () => {
    if (!manpowerDetails) return 0;
    return manpowerDetails.reduce((acc, staff) => acc + (staff.totalAmount || 0), 0).toFixed(2);
  };

  return (
    <div className="main-content-area">
      <div className='manpower-wrapper'>
        <div className="manpower-header-wrapper">
          <div className="manpower-header-container">
            <h1>Manpower Details</h1>
            <div>
              <label htmlFor="manpower-project-select">Select Project:</label>
              <select
                id="manpower-project-select"
                value={selectedProject}
                onChange={handleChange}
              >
                <option value="">--Please choose a project--</option>
                {projects.map((project) => (
                  <option key={project._id} value={project._id}>
                    {project.projectTitle}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading && <p className="centered-message">Loading manpower details...</p>}
        {error && <p className="centered-message error">{error}</p>}
        {manpowerDetails && (
          <div className="manpower-details-container">
            <div className="table-responsive">
              <table className="manpower-details-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Number of Posts</th>
                    <th>Salary per Head</th>
                    <th>Total Salary</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {manpowerDetails.map((staff, index) => (
                    <tr key={index}>
                      <td>{staff.name}</td>
                      <td>{staff.numberOfPost}</td>
                      <td>{staff.salaryPerHead}</td>
                      <td>{staff.totalSalary}</td>
                      <td>{staff.totalAmount}</td>
                    </tr>
                  ))}
                  <tr className="manpower-total-row">
                    <td colSpan="4" className="manpower-grand-total">Grand Total:</td>
                    <td className="manpower-grand-total-amount">
                      {calculateGrandTotal()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManpowerDetails;