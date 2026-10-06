const API_URL = import.meta.env.API_URL || 'http://localhost:5001/api/todos'

// Centralized fetch function for getting all todos
export const getTodos = async () => {
  const response = await fetch(API_URL);
  
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  return await response.json();
};

export const createTodo = async (todoData) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(todoData),
  });

  if (!response.ok) {
    throw new Error('Failed to save to database');
  }

  return await response.json();
};

// Reusable service function for toggling a todo's done status
export const toggleTodoDone = async (id) => {
  const response = await fetch(`${API_URL}/${id}/done`, {
    method: 'PATCH',
  });

  if (!response.ok) {
    throw new Error('Failed to update todo status');
  }

  return await response.json();
};