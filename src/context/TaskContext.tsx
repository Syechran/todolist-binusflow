import React, { createContext, useState, useEffect} from 'react';
import type { ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task, CustomColor } from '../types';

interface TaskContextType {
  tasks: Task[];
  colors: CustomColor[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTaskStatus: (id: string, status: Task['status']) => void;
  addColor: (hex: string) => void;
  deleteColor: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('binusflow_tasks');
      if (!saved) return [];
      
      const parsed = JSON.parse(saved);
      if (!Array.isArray(parsed)) return [];
      
      return parsed.map((t: any) => ({
        ...t,
        id: t.id || uuidv4(),
        status: t.status || 'To Do',
        color: t.color || '#ffffff'
      }));
    } catch (error) {
      console.error("Gagal memuat tasks:", error);
      return [];
    }
  });
  
  const [colors, setColors] = useState<CustomColor[]>(() => {
     try {
      const saved = localStorage.getItem('binusflow_colors');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('binusflow_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('binusflow_colors', JSON.stringify(colors));
  }, [colors]);

  const addTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateTaskStatus = (id: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const addColor = (hex: string) => {
    const newColor: CustomColor = {
      id: uuidv4(),
      hexCode: hex
    };
    setColors([...colors, newColor]);
  };

  const deleteColor = (id: string) => {
    const colorToDelete = colors.find(c => c.id === id);
    setColors(colors.filter(c => c.id !== id));

    if (colorToDelete) {
      setTasks(tasks.map(task => 
        task.color === colorToDelete.hexCode ? { ...task, color: '#ffffff' } : task
      ));
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, colors, addTask, deleteTask, updateTaskStatus, addColor, deleteColor }}>
      {children}
    </TaskContext.Provider>
  );
};