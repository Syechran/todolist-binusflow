import { useState, useContext } from 'react';
import { TaskContext } from '../context/TaskContext';
import { FaPlus, FaTimes } from 'react-icons/fa';
import AddColorModal from '../components/AddColorModal';

const Configuration = () => {
  const context = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <div style={{
        backgroundColor: '#ff8c42',
        padding: '20px',
        borderRadius: '8px',
        color: 'white',
        marginBottom: '20px',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        This is configuration page
      </div>

      <h3 style={{ marginBottom: '15px', color: '#333' }}>Color List</h3>
      <div style={{
        backgroundColor: '#ff8c42',
        padding: '30px',
        borderRadius: '12px',
        minHeight: '300px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'flex-start'
      }}>

        {context?.colors.map((color) => (
          <div 
            key={color.id} 
            style={{ position: 'relative' }}>
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: color.hexCode,
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }} />
            <button
              onClick={() => context.deleteColor(color.id)}
              style={{
                position: 'absolute',
                top: '-10px',
                right: '-10px',
                width: '25px',
                height: '25px',
                borderRadius: '50%',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem'
              }}
              title="Delete Color"
            >
              <FaTimes />
            </button>
          </div>
        ))}
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#0056b3',
            borderRadius: '8px',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
          }}
        >
          <FaPlus size={30} />
        </button>

      </div>

      {isModalOpen && (
        <AddColorModal onClose={() => setIsModalOpen(false)} />
      )}

    </div>
  );
};

export default Configuration;