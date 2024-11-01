import React from 'react';
import { useFormContext } from 'react-hook-form';
import './Sidebar.css';

const Sidebar = ({ pages, currentPage, setCurrentPage }) => {
  // Remove validation logic to allow free movement
  return (
    <div className="sidebar">
      <div className="sidebar-title"></div>
      <ul className="sidebar-list">
        {pages.map((page, index) => (
          <li
            key={index}
            className={`sidebar-item ${currentPage === index ? 'active' : ''}`}
            onClick={() => setCurrentPage(index)}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
