
import React from 'react';
import { Link } from 'react-router-dom'; 
import { DocumentArrowUpIcon, HomeIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import './Sidenav.css'; 

const Sidenav = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
          Task Center
      </div>
      <ul className="sidebar-menu">
      <li className="sidebar-item">  
          <Link to="/" className="sidebar-link">
            <HomeIcon className="sidebar-icon" />
            <span className="sidebar-text">Home</span>
          </Link>
        </li>
        <li className="sidebar-item">  
          <Link to="/tasks" className="sidebar-link">
            <ClipboardDocumentIcon className="sidebar-icon" />
            <span className="sidebar-text">Tasks</span>
          </Link>
        </li>
        <li className="sidebar-item">
          <Link to="/add-tasks" className="sidebar-link">
            <DocumentArrowUpIcon className="sidebar-icon" />
            <span className="sidebar-text">Add Tasks</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidenav;