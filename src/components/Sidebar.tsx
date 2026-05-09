import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCog, FaBars, FaArrowLeft } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {

  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-header">
        {isOpen && <span>BinusFlow</span>}
        <button onClick={toggleSidebar} className="toggle-btn">
          {isOpen ? <FaArrowLeft /> : <FaBars />}
        </button>
      </div>
      <nav style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
        >
          <FaHome size={20} />
          {isOpen && <span>Dashboard</span>}
        </NavLink>
        <NavLink 
          to="/configuration" 
          className={({ isActive }) => isActive ? "menu-item active" : "menu-item"}
        >
          <FaCog size={20} />
          {isOpen && <span>Configuration</span>}
        </NavLink>

      </nav>
    </div>
  );
};

export default Sidebar;