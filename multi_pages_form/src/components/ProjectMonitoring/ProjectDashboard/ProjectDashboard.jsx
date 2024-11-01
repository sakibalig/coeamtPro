import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProjectDashboard.css';

const ProjectDashboard = () => {
    const [filters, setFilters] = useState({ projectType: "", projectStatus: "" });
    const [searchQuery, setSearchQuery] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch projects based on filters
    const fetchProjects = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:8000/api/v1/user/filterProject', {
                params: filters
            });
            setProjects(response.data.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
            setError('Failed to fetch projects. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, [filters]);

    // Handle filter change
    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter projects based on projectCode matching the search query
    const filteredProjects = projects.filter(project =>
        project.projectCode.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='Rajaji'>
            <div className="header-select-wrapper">
                <div className="header-select-container">
                    <h1>Project Dashboard</h1>
                    <div>
                        <label htmlFor="project-type-select">Project Type:</label>
                        <select
                            name="projectType"
                            id="project-type-select"
                            value={filters.projectType}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Types</option>
                            <option value="sponsored">Sponsored</option>
                            <option value="unsponsored">Unsponsored</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="project-status-select">Project Status:</label>
                        <select
                            name="projectStatus"
                            id="project-status-select"
                            value={filters.projectStatus}
                            onChange={handleFilterChange}
                        >
                            <option value="">All Statuses</option>
                            <option value="ongoing">Ongoing</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>

                    {/* Search bar on the right */}
                    <div className="search-bar">
                        <label htmlFor="search">Search by Project Code:</label>
                        <input
                            type="text"
                            id="search"
                            placeholder="Enter project code"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
            </div>

            {loading && <p>Loading projects...</p>}
            {error && <p className="error">{error}</p>}
            {!loading && !error && filteredProjects.length === 0 && <p>No projects found matching the current filters.</p>}
            {filteredProjects.length > 0 && (
                <div className="fund-details-container">
                    <div className="table-responsive">
                        <table className="fund-details-table">
                            <thead>
                                <tr>
                                    <th>Project Name</th>
                                    <th>Project Code</th>
                                    <th>PI / Co PI</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Project Cost</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProjects.map((project) => (
                                    <tr key={project._id}>
                                        <td data-label="Project Name">{project.projectTitle}</td>
                                        <td data-label="Project Code">{project.projectCode}</td>
                                        <td data-label="PI / Co PI">{project.piName}</td>
                                        <td data-label="Start Date">{new Date(project.projectInitiation).toLocaleDateString()}</td>
                                        <td data-label="End Date">{new Date(project.projectClosing).toLocaleDateString()}</td>
                                        <td data-label="Project Cost">{project.projectCost}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDashboard;