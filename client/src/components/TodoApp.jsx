import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoHero from './TodoHero';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import { getTodos } from '../../../server/services/todoService';

function TodoApp() {
    const [todos, setTodos] = useState([]);

    // Access/Get data from MongoDB when page loads
    useEffect(() => {
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

      fetchTodoList();
    }, []);

    // Updates screen state after database changes
    const handleNewTodo = (newTodoFromDB) => {
        setTodos([newTodoFromDB, ...todos]);
    };

    return (
        <div>
            <TodoHeader />
            <TodoForm onTodoAdded={handleNewTodo} />
            <TodoList todos={todos} />
        </div>
    )
}

export default TodoApp