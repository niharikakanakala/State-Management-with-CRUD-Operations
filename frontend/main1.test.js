import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import axios from 'axios';
import App from './src/App';

jest.mock('axios');
jest.mock('./src/components/TodoList', () => ({ tasks, onUpdateTask }) => (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          {task.description}
          <button onClick={() => onUpdateTask({ ...task, description: 'Updated Task' })}>Update</button>
        </li>
      ))}
    </ul>
  ));
  
  describe('App', () => {
    it('updates a task correctly', async () => {
      const mockTasks = [{ id: 1, description: 'Task 1', isCompleted: false }];
      axios.get.mockResolvedValue({ data: mockTasks });
  
      const { findByText } = render(<App />);
  
      // Wait for the "Update" button to be rendered and then click it
      const updateButton = await findByText('Update');
      fireEvent.click(updateButton);
  
      // Assert that the task description is updated
      const updatedTask = await findByText('Updated Task');
      expect(updatedTask).toBeInTheDocument;
    });
  });