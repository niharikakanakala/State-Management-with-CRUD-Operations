// TodoList.test.js
import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';
import App from './src/App';

import TodoList from './src/components/TodoList';
import AddTaskForm from './src/components/AddTaskForm';

jest.mock('axios');

jest.mock('./src/components/TodoList', () => ({ tasks, onDeleteTask }) => (
  <ul>
    {tasks.map(task => (
      <li key={task.id}>
        {task.description}
        <button onClick={() => onDeleteTask(task.id)}>Delete</button>
      </li>
    ))}
  </ul>
));

describe('App', () => {
  it('deletes a task correctly', async () => {
    // Mock the initial task fetching
    const mockTasks = [{ id: 1, description: 'Test Task 1', isCompleted: false }];
    axios.get.mockResolvedValue({ data: mockTasks });

    const { getByText, queryByText } = render(<App />);

    // Wait for the mock tasks to be loaded
    await waitFor(() => expect(getByText('Test Task 1')).toBeInTheDocument());

    // Simulate deleting a task
    fireEvent.click(getByText('Delete'));

    // Assert the task is deleted
    expect(queryByText('Test Task 1')).toBeNull();
  });
});

