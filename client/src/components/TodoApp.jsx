import { useState, useEffect } from 'react';
import TodoForm from './TodoForm';
import TodoHero from './TodoHero';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';

function TodoApp() {
    const [todos, setTodos] = useState([]);

    // Access/Get data from MongoDB when page loads
    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
        .then((res) => res.json())
        .then((data) => setTodos(data))
        .catch((err) => console.error(err));
    }, []);

    // Updates screen state after database changes
    const handleNewTodo = (newTodoFromDB) => {
        setTodos([newTodoFromDB, ...todos]);
    };

    return (
        <div>
            <TodoHeader />
            <TodoForm onTodoAdded={handleNewTodo} />
            <TodoHero />
            <TodoList />
        </div>
    )
}

export default TodoApp