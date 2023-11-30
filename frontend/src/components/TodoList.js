// src/components/TodoList.js
import React, { useState } from 'react';
import axios from 'axios';

const TodoList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [editedTask, setEditedTask] = useState({ id: null, description: '' });

  const handleUpdate = async (id) => {
    // try {
    //   await axios.put(`http://localhost:8000/api/todo/${id}`, editedTask);
    //   onUpdateTask(editedTask);
    //   setEditedTask({ id: null, description: '' });
    // } catch (error) {
    //   console.error('Error updating task:', error);
    // }
  };

  const handleDelete = async (id) => {
    // try {
    //   await axios.delete(`http://localhost:8000/api/todo/${id}`);
    //   onDeleteTask(id);
    // } catch (error) {
    //   console.error('Error deleting task:', error);
    // }
  };

  const handleComplete = async (id) => {
    // try {
    //   // Toggle the isCompleted value
    //   const updatedTask = { ...tasks.find(task => task.id === id), isCompleted: true };
    //   await axios.put(`http://localhost:8000/api/todo/${id}`, updatedTask);
    //   onUpdateTask(updatedTask);
    // } catch (error) {
    //   console.error('Error marking task as completed:', error);
    // }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px', maxWidth: '400px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>ToDo List</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '3px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {editedTask.id === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTask.description}
                  onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                  style={{ marginRight: '10px', flex: '1' }}
                />
                <button onClick={() => handleUpdate(task.id)} style={{ background: '#4caf50', color: '#fff', border: 'none', padding: '8px', borderRadius: '3px', cursor: 'pointer' }}>Update</button>
              </>
            ) : (
              <>
                <span style={{ flex: '1' }}>{task.description} - {task.isCompleted ? 'Completed' : 'Pending'}</span>
                <div>
                  <button onClick={() => setEditedTask({ id: task.id, description: task.description })} style={{ background: '#2196F3', color: '#fff', border: 'none', padding: '8px', borderRadius: '3px', marginRight: '5px', cursor: 'pointer' }}>Edit</button>
                  {!task.isCompleted && (
                    <button onClick={() => handleComplete(task.id)} style={{ background: '#4caf50', color: '#fff', border: 'none', padding: '8px', borderRadius: '3px', cursor: 'pointer' }}>Complete</button>
                  )}
                  <button onClick={() => handleDelete(task.id)} style={{ background: '#f44336', color: '#fff', border: 'none', padding: '8px', borderRadius: '3px', cursor: 'pointer' }}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
