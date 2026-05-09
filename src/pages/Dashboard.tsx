import { useState, useContext } from 'react';
import Toolbar from '../components/Toolbar';
import TaskBoard from '../components/TaskBoard';
import CreateTaskModal from '../components/CreateTaskModal';
import ViewTaskModal from '../components/ViewTaskModal';
import type { Task } from '../types';
import { TaskContext } from '../context/TaskContext';

const Dashboard = () => {
  const context = useContext(TaskContext);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = () => {
    setIsCreateModalOpen(true);
  };

  const handleDeleteAll = () => {
    const isSure = window.confirm("WARNING: Are you sure you want to DELETE ALL TASKS? This cannot be undone.");
    if (isSure && context) {
      context.tasks.forEach(t => context.deleteTask(t.id));
    }
  };
  
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div style={{ padding: '20px', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <Toolbar 
        onSearch={setSearchQuery} 
        onAdd={handleAddTask} 
        onDeleteAll={handleDeleteAll} 
      />

      <div style={{ flex: 1, marginTop: '10px' }}>
        <TaskBoard 
          searchQuery={searchQuery} 
          onTaskClick={handleTaskClick} 
        />
      </div>

      {isCreateModalOpen && (
        <CreateTaskModal onClose={() => setIsCreateModalOpen(false)} />
      )}

      {selectedTask && (
        <ViewTaskModal 
          task={selectedTask} 
          onClose={() => setSelectedTask(null)} 
        />
      )}

    </div>
  );
};

export default Dashboard;