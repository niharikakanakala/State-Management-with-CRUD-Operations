// src/App.js
import React, { useState, useEffect } from 'react';
import TodoList from './components/TodoList';
import AddTaskForm from './components/AddTaskForm';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/todo');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleTaskAdded = (task) => {
    setTasks([...tasks, task]);
  };

  const handleTaskDeleted = (id) => {
     setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  return (
    <div style={appContainerStyle}>
      <h1 style={appTitleStyle}>Task Manager</h1>
      <AddTaskForm onTaskAdded={handleTaskAdded} />
      <TodoList
        tasks={tasks}
        onUpdateTask={handleTaskUpdated}
        onDeleteTask={handleTaskDeleted}
      />
    </div>
  );
};

const appContainerStyle = {
  maxWidth: '600px',
  margin: 'auto',
  padding: '20px',
  fontFamily: 'Arial, sans-serif',
};

const appTitleStyle = {
  textAlign: 'center',
  color: '#333',
};

export default App;
