import { useState } from 'react';

export default function TodoForm({ onTodoAdded }) {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Prevent empty submissions
    if (!value.trim()) return;

    // 2. Set loading state to prevent double-clicks
    setIsSubmitting(true);

    try {
        console.log('value', value)
      // 3. Push data directly to your NodeJS/MongoDB API
      const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: value })
      });

      if (!response.ok) {
        throw new Error('Failed to save to database');
      }

      // 4. Parse the saved document returned from MongoDB
      const savedTodo = await response.json();
      
      // 5. Tell the parent UI to add this new item to the active screen list
    //   if (onTodoAdded) {
    //     onTodoAdded(savedTodo);
    //   }

      // 6. Clear input field on success
      setValue('');
    } catch (err) {
      console.error('Error adding to MongoDB:', err);
      alert('Could not save task. Please try again.');
    } finally {
      // 7. Reset loading state
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <input
        type="text"
        placeholder="Add a new task..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={isSubmitting} // Lock input during saving
        className="todo-input"
      />
      <button type="submit" disabled={isSubmitting} className="todo-button">
        {isSubmitting ? 'Saving...' : 'Add Task'}
      </button>
    </form>
  );
}
