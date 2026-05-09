import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TaskContext } from '../context/TaskContext';
import type { TaskStatus } from '../types';
import './Modal.css';

interface CreateTaskModalProps {
  onClose: () => void;
}

const DEFAULT_COLORS = ['#ff7eb9', '#7afcff', '#feff9c', '#fff740', '#ff65a3'];

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ onClose }) => {
  const context = useContext(TaskContext);
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('To Do');
  const [selectedColor, setSelectedColor] = useState(DEFAULT_COLORS[0]);

  const allColors = [...DEFAULT_COLORS, ...(context?.colors.map(c => c.hexCode) || [])];

  const handleSave = () => {
    if (!title.trim()) {
      alert("Judul tidak boleh kosong!");
      return;
    }

    const newTask = {
      id: uuidv4(),
      title,
      description,
      status,
      color: selectedColor
    };

    context?.addTask(newTask);
    
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ marginBottom: '20px' }}>Create New Task</h2>
        
        <div className="form-group">
          <label className="form-label">Title</label>
          <input 
            type="text" 
            className="form-input" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Judul Tugas"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea 
            className="form-textarea" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsi tugas"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select 
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Color</label>
          <div className="color-options">
            {allColors.map((color, index) => (
              <div 
                key={index}
                className={`color-circle ${selectedColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn btn-save" onClick={handleSave}>Save Task</button>
        </div>

      </div>
    </div>
  );
};

export default CreateTaskModal;