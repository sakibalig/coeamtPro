import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FundDetails.css';

const FundDetails = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [fundDetails, setFundDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('https://ipmproject.onrender.com/api/v1/user/getAllProjects');
        setProjects(response.data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const fetchFundDetails = async (projectId) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://ipmproject.onrender.com/api/v1/user/fundDetails/${projectId}`);
      setFundDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching fund details');
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const projectId = event.target.value;
    setSelectedProject(projectId);

    if (projectId) {
      fetchFundDetails(projectId);
    } else {
      setFundDetails(null);
    }
  };

  return (
    <div className='Rajaji'>
      <div className="header-select-wrapper">
        <div className="header-select-container">
          <h1>Fund Details</h1>
          <div>
            <label htmlFor="project-select">Select Project:</label>
            <select id="project-select" value={selectedProject} onChange={handleChange}>
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

      {loading && <p>Loading fund details...</p>}
      {error && <p>{error}</p>}
      {fundDetails && (
        <div className="fund-details-container">
          <div className="table-responsive">
            <table className="fund-details-table">
              <thead>
                <tr>
                  <th>Fund Type</th>
                  <th>1st Installment</th>
                  <th>2nd Installment</th>
                  <th>3rd Installment</th>
                  <th>4th Installment</th>
                  <th>5th Installment</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {fundDetails.map((row, index) => (
                  <tr key={index}>
                    <td>{row.fundType}</td>
                    {['installment1', 'installment2', 'installment3', 'installment4', 'installment5'].map((installment) => (
                      <td key={installment}>
                        {row.installments[installment] || 0}
                      </td>
                    ))}
                    <td>{(row.totalAmount || 0).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="total-row">
                  <td colSpan="6" className="grand-total">Grand Total:</td>
                  <td className="grand-total-amount">
                    {fundDetails.reduce((acc, row) => acc + (row.totalAmount || 0), 0).toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundDetails;
