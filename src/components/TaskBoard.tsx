import React, { useContext } from 'react';
import { DragDropContext, Droppable, type DropResult } from '@hello-pangea/dnd';
import { TaskContext } from '../context/TaskContext';
import TaskCard from './TaskCard';
import type { Task, TaskStatus } from '../types';
import { FaBolt, FaRunning, FaCheck } from 'react-icons/fa';
import './TaskBoard.css';

const columns: { id: TaskStatus; label: string; icon: React.ReactNode }[] = [
  { id: 'To Do', label: 'To Do', icon: <FaBolt color="#f39c12" /> },
  { id: 'In Progress', label: 'In Progress', icon: <FaRunning color="#3498db" /> },
  { id: 'Done', label: 'Done', icon: <FaCheck color="#2ecc71" /> },
];

interface TaskBoardProps {
  searchQuery: string;
  onTaskClick: (task: Task) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ searchQuery, onTaskClick }) => {
  const context = useContext(TaskContext);
  
  if (!context) return null;
  const { tasks, updateTaskStatus } = context;

  const onDragEnd = (result: DropResult) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === result.source.droppableId &&
      destination.index === result.source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as TaskStatus;
    updateTaskStatus(draggableId, newStatus);
  };

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board-container">
        
        {columns.map((col) => {
          const columnTasks = filteredTasks.filter(task => task.status === col.id);

          return (
            <div key={col.id} className="board-column">
              <div className="column-header">
                {col.icon} 
                <span>{col.label}</span>
              </div>
              <Droppable droppableId={col.id}>
                {(provided, snapshot) => (
                  <div 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ 
                      flex: 1, 
                      minHeight: '100px',
                      backgroundColor: snapshot.isDraggingOver ? 'rgba(0,0,0,0.02)' : 'transparent',
                      borderRadius: '8px',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    {columnTasks.map((task, index) => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        index={index} 
                        onClick={onTaskClick}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>

            </div>
          );
        })}

      </div>
    </DragDropContext>
  );
};

export default TaskBoard;