import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

function TodoList() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/todos')
        .then((res) => res.json())
        .then((data) => setTodos(data))
        .catch((err) => console.error('Error:', err));
    }, []);

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <TodoItem todo={todo} />
            ))}
      </ul>
    )
}

export default TodoList