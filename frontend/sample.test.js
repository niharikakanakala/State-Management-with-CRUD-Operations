// TodoList.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks';
import { useState } from 'react';
import App from './src/App';
import axios from 'axios';
import '@testing-library/jest-dom/extend-expect';

import TodoList from './src/components/TodoList';
import AddTaskForm from './src/components/AddTaskForm';

jest.mock('axios');

describe('AddTaskForm', () => {
  it('allows the user to add a task', async () => {
    const mockOnTaskAdded = jest.fn();
    const { getByPlaceholderText, getByText } = render(<AddTaskForm onTaskAdded={mockOnTaskAdded} />);

    axios.post.mockResolvedValue({
      data: { id: 1, description: 'Test Task', isCompleted: false },
    });

    fireEvent.change(getByPlaceholderText('Enter task description'), { target: { value: 'Test Task' } });
    fireEvent.click(getByText('Add Task'));

    await waitFor(() => {
      expect(mockOnTaskAdded).toHaveBeenCalledWith({ id: 1, description: 'Test Task', isCompleted: false });
    });
  });
});

describe('TodoList', () => {
  const mockTasks = [{ id: 1, description: 'Test Task 1', isCompleted: false }];
  const mockOnUpdateTask = jest.fn();
  const mockOnDeleteTask = jest.fn();

  it('allows the user to edit a task', async () => {
    const updatedDescription = 'Updated Task 1';
    axios.put.mockResolvedValue({
      data: { ...mockTasks[0], description: updatedDescription },
    });

    const { getByText, getByDisplayValue, getByRole } = render(
      <TodoList
        tasks={mockTasks}
        onUpdateTask={mockOnUpdateTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    fireEvent.click(getByText('Edit'));
    fireEvent.change(getByDisplayValue(mockTasks[0].description), { target: { value: updatedDescription } });
    fireEvent.click(getByRole('button', { name: 'Update' }));

    await waitFor(() => {
      expect(mockOnUpdateTask).toHaveBeenCalledWith({
        id: mockTasks[0].id, // You expect only the id and the new description
        description: updatedDescription,
      });
    });
  });
});

describe('TodoList', () => {
  const mockTasks = [{ id: 1, description: 'Test Task 1', isCompleted: false }];
  const mockOnUpdateTask = jest.fn();
  const mockOnDeleteTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows the user to delete a task', async () => {
    // Mock the axios.delete call to simulate a successful delete operation
    axios.delete.mockResolvedValue({});

    const { getByText } = render(
      <TodoList
        tasks={mockTasks}
        onUpdateTask={mockOnUpdateTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    // Click the delete button for the task
    fireEvent.click(getByText('Delete'));

    await waitFor(() => {
      // Expect the onDeleteTask to have been called with the correct task id
      expect(mockOnDeleteTask).toHaveBeenCalledWith(mockTasks[0].id);
    });
  });
});



describe('TodoList', () => {
  it('completes a task', async () => {
    const tasks = [{ id: 1, description: 'Test Task 1', isCompleted: false }];
    const mockOnUpdateTask = jest.fn();
    const mockOnDeleteTask = jest.fn();

    // Mock the axios.put call
    axios.put.mockResolvedValue({});

    const { getByText } = render(
      <TodoList
        tasks={tasks}
        onUpdateTask={mockOnUpdateTask}
        onDeleteTask={mockOnDeleteTask}
      />
    );

    // Simulate clicking the complete button for the task
    fireEvent.click(getByText('Complete'));

    await waitFor(() => {
      // Check if onUpdateTask was called with the task marked as completed
      expect(mockOnUpdateTask).toHaveBeenCalledWith({ ...tasks[0], isCompleted: true });
    });
  });
});

