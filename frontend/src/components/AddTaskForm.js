// src/components/AddTaskForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTaskForm = ({ onTaskAdded }) => {
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    // try {
    //   const response = await axios.post('http://0.0.0.0:8000/api/todo', {
    //     description,
    //     isCompleted: false,
    //     createdAt: new Date().toISOString(),
    //   });

    //   onTaskAdded(response.data);
    //   setDescription('');
    // } catch (error) {
    //   console.error('Error adding task:', error);
    // }
  };

  return (
    <div style={formContainerStyle}>
      <input
        type="text"
        placeholder="Enter task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={inputStyle}
      />
      <button onClick={handleAddTask} style={buttonStyle}>
        Add Task
      </button>
    </div>
  );
};

const formContainerStyle = {
  marginBottom: '20px',
  display: 'flex',
  justifyContent: 'space-between',
};

const inputStyle = {
  flex: '1',
  marginRight: '10px',
  padding: '8px',
  borderRadius: '3px',
  border: '1px solid #ccc',
};

const buttonStyle = {
  background: '#4caf50',
  color: '#fff',
  border: 'none',
  padding: '8px',
  borderRadius: '3px',
  cursor: 'pointer',
};

export default AddTaskForm;
