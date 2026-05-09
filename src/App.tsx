import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './context/TaskContext';
import MainLayout from './layout/MainLayout';
import Dashboard from './pages/Dashboard';
import Configuration from './pages/Configuration';

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="configuration" element={<Configuration />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  );
}

export default App;