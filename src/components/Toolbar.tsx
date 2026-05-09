import React from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';
import './Toolbar.css';

interface ToolbarProps {
  onSearch: (query: string) => void;
  onAdd: () => void;
  onDeleteAll: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSearch, onAdd, onDeleteAll }) => {
  return (
    <div className="toolbar-container">
      
      <div className="search-wrapper">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="action-buttons">
        
        <button className="circle-btn" onClick={onAdd} title="Add New Task">
          <FaPlus />
        </button>

        <button className="circle-btn" onClick={onDeleteAll} title="Delete All Tasks">
          <FaTrash />
        </button>

      </div>
    </div>
  );
};

export default Toolbar;