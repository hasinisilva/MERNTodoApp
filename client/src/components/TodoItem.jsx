function TodoItem({todo, handleToggleDone}) {
    const todoId = todo?._id || todo?.id;

    return (
        <tr 
            key={todoId} 
            style={{ 
              borderBottom: '1px solid #eee',
              backgroundColor: todo.done ? '#f9f9f9' : 'transparent' 
            }}
        >
            {/* Checkbox Section */}
            <td style={{ padding: '12px', textAlign: 'center' }}>
              <input 
                type="checkbox"
                checked={!!todo.done}
                onChange={() => handleToggleDone && handleToggleDone(todoId)}
                style={{ cursor: 'pointer', width: '18px', height: '18px' }}
              />
            </td>
            {/* Title (with strike-through effect if done) */}
            <td style={{ 
              padding: '12px', 
              fontWeight: 'bold',
              textDecoration: todo.done ? 'line-through' : 'none',
              color: todo.done ? '#888' : '#000'
            }}>
              {todo.title}
            </td>
            {/* Description */}
            <td style={{ padding: '12px', color: '#555' }}>
              {todo.description || 'No description'}
            </td>
            {/* Created Date */}
            <td style={{ padding: '12px', color: '#888', fontSize: '14px' }}>
              {todo.createdAt ? new Date(todo.createdAt).toLocaleDateString() : 'N/A'}
            </td>
          </tr>
    )
}

export default TodoItem