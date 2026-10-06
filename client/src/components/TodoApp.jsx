import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import { getTodos } from '../../../server/services/todoService';
import LoadingSpinner from './LoadingSpinner';

function TodoApp() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Access/Get data from MongoDB when page loads
    useEffect(() => {
      const fetchTodoList = async () => {
        try {
          const data = await getTodos();
          setTodos(data);
        } catch (err) {
          console.error('Error fetching todos:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchTodoList();
    }, []);

    // Updates screen state after database changes
    const handleNewTodo = (newTodoFromDB) => {
        setTodos([newTodoFromDB, ...todos]);
    };

    return (
        loading 
        ? <LoadingSpinner/>
        : <div>
            <TodoHeader />
            <TodoForm onTodoAdded={handleNewTodo} />
            <TodoList todos={todos} />
        </div>
    )
}

export default TodoApp