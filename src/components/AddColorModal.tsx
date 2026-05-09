import React, { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import './Modal.css';

interface AddColorModalProps {
  onClose: () => void;
}

const AddColorModal: React.FC<AddColorModalProps> = ({ onClose }) => {
  const context = useContext(TaskContext);
  const [hexCode, setHexCode] = useState('');

  const fullHex = `#${hexCode}`;
  const isValidHex = /^#[0-9A-F]{6}$/i.test(fullHex);

  const handleSave = () => {
    if (isValidHex) {
      context?.addColor(fullHex); 
      onClose();
    } else {
      alert("Masukkan kode Hex yang valid!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 style={{ marginBottom: '20px' }}>Add Custom Color</h2>
        
        <div className="form-group">
          <label className="form-label">Color Hex Code</label>
          
          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', borderRadius: '6px', overflow: 'hidden' }}>
            <input 
              type="text" 
              value={hexCode}
              onChange={(e) => {
                const val = e.target.value.replace(/[^0-9A-Fa-f]/g, '').toUpperCase();
                setHexCode(val);
              }}
              placeholder="000000"
              maxLength={6}
              style={{
                border: 'none',
                padding: '10px',
                flex: 1,
                outline: 'none',
                fontSize: '1rem'
              }}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Preview</label>
          {isValidHex ? (
            <div style={{
              width: '100px',
              height: '100px',
              backgroundColor: fullHex,
              borderRadius: '8px',
              border: '1px solid #ccc',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }} />
          ) : (
            <div style={{
              width: '100%',
              height: '100px',
              backgroundColor: '#eee',
              color: '#888',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px',
              border: '1px dashed #ccc'
            }}>
              No Preview Available
            </div>
          )}
        </div>

        <div className="modal-actions">
          <button className="btn btn-cancel" onClick={onClose}>Cancel</button>
          <button 
            className="btn btn-save" 
            onClick={handleSave}
            disabled={!isValidHex}
            style={{ opacity: isValidHex ? 1 : 0.5 }}
          >
            Save Color
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddColorModal;