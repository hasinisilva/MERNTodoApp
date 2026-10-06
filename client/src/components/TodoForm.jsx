import { useState } from 'react';
import { getTodos, createTodo } from '../../../server/services/todoService';;


export default function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      // 3. Push data using the centralized method
      const savedTodo = await createTodo({ 
        title: title, 
        description: description, 
        done: false 
      }).then(() => {
        setTitle('');
        setDescription('');
        fetchTodoList();
      });

      if (onTodoAdded) onTodoAdded(savedTodo); // Refresh your list or state
    } catch (err) {
      console.error(err.message);
    }
  };

    const fetchTodoList = async () => {
        try {
          const data = await getTodos();
          setTodos(data);
        } catch (err) {
          console.error('Error fetching todos:', err);
        } finally {
          //setLoading(false);
        }
      };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isSubmitting} // Lock input during saving
          />
        <input
          type="text"
          placeholder="Add a new task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isSubmitting} // Lock input during saving
          />
        <button type="submit" disabled={isSubmitting} className="todo-button">
          {isSubmitting ? 'Saving...' : 'Add Task'}
        </button>
      </form>
    </>
  );
}
