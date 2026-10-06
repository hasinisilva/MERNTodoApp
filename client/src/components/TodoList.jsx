import TodoItem from './TodoItem';
import { useState, useEffect } from 'react';
import { getTodos, toggleTodoDone } from '../../../server/services/todoService';;

function TodoList({todos}) {
    const [completed, setCompleted] = useState([]);
    const [updatedTodos, setUpdatedTodos] = useState(todos);

    // Handler utilizing the reusable service method
    const handleToggleDone = async (id) => {
        try {
        const updatedTodo = await toggleTodoDone(id); // Call the service

        // Update state locally so the UI updates instantly
        setCompleted(todo => (todo._id === id ? updatedTodo : todo))
        await fetchTodoList()
        } catch (err) {
        console.error(err.message);
        }
    };

    const fetchTodoList = async () => {
        try {
          const data = await getTodos();
          setUpdatedTodos(data);
        } catch (err) {
          console.error('Error fetching todos:', err);
        } finally {
          //setLoading(false);
        }
      };


    useEffect(() => {
        fetchTodoList();
    }, [completed]);

    return (
            
        <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
                    <th style={{ padding: '12px' }}>Title</th>
                    <th style={{ padding: '12px' }}>Description</th>
                    <th style={{ padding: '12px' }}>Status</th>
                    <th style={{ padding: '12px' }}>Created At</th>
                </tr>
                </thead>
                <tbody>
                    {updatedTodos.map((todo, index) => (
                        <TodoItem todo={todo} key={todo?._id || todo?.id || index} handleToggleDone={handleToggleDone} />
                    ))}
                </tbody>
            </table>
        </div>

    )
}

export default TodoList