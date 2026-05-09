import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  index: number;
  onClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, onClick }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onClick(task)}
          style={{
            backgroundColor: task.color,
            padding: '15px',
            marginBottom: '10px',
            borderRadius: '8px',
            minHeight: '80px',
            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            cursor: 'grab',
            color: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontWeight: 'bold',
            ...provided.draggableProps.style,
          }}>
          <span>{task.title}</span>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;