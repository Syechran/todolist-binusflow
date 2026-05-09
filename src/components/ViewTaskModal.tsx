import React, { useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import type { Task } from '../types';
import './Modal.css';

interface ViewTaskModalProps {
  task: Task;
  onClose: () => void;
}

const ViewTaskModal: React.FC<ViewTaskModalProps> = ({ task, onClose }) => {
  const context = useContext(TaskContext);

  const handleDelete = () => {
    const isSure = window.confirm(`Are you sure you want to delete "${task.title}"?`);
    if (isSure) {
      context?.deleteTask(task.id);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="modal-header-blue">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
            <div>
              <span className="label-small">Title</span>
              <div className="read-only-box" style={{ minWidth: '200px' }}>
                {task.title}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span className="label-small">Status</span>
              <div className="read-only-box" style={{ backgroundColor: 'white', color: '#333' }}>
                {task.status}
              </div>
            </div>
          </div>

        </div>

        <div className="modal-body-cream">
          <label className="form-label" style={{ color: '#666' }}>Description</label>
          <div style={{ 
            minHeight: '100px', 
            color: '#333', 
            fontSize: '1.1rem', 
            whiteSpace: 'pre-wrap' 
          }}>
            {task.description || "No description provided."}
          </div>
          <div className="modal-actions" style={{ marginTop: '30px' }}>
            <button className="btn btn-delete" onClick={handleDelete}>
              Delete
            </button>
            
            <button className="btn btn-cancel" onClick={onClose}>
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ViewTaskModal;