import { useState } from 'react';

function TodoItem({todo}) {
    return (
        <li key={todo.id}>
            {todo.text}
        </li>
    )
}

export default TodoItem