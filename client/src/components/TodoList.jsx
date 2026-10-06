import { useState, useEffect } from "react";
import {
  getTodos,
  toggleTodoDone,
  updateTodo,
  deleteTodo,
} from "../../../server/services/todoService";
import "../styles/todoList.css";
import LoadingSpinner from "./LoadingSpinner";

function TodoList({ todos }) {
  const [completed, setCompleted] = useState([]);
  const [deleted, setDeleted] = useState([]);
  const [updatedTodos, setUpdatedTodos] = useState(todos);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [loading, setLoading] = useState(true);

  // Handler utilizing the reusable service method
  const handleToggleDone = async (id) => {
    try {
      const updatedTodo = await toggleTodoDone(id); // Call the service

      setCompleted((todo) => (todo._id === id ? updatedTodo : todo));
      await fetchTodoList();
    } catch (err) {
      console.error(err.message);
    }
  };

  const fetchTodoList = async () => {
    try {
      const data = await getTodos();
      setUpdatedTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handler for Editing a Todo
  const handleEdit = async (id, updateData) => {
    try {
      const updated = await updateTodo(id, updateData);
      setUpdatedTodos((t) => (t._id === id ? updated : t));
      await fetchTodoList();
    } catch (err) {
      console.error(err.message);
    }
  };

  // Handler for Deleting a Todo
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setDeleted((t) => t._id !== id);
      await fetchTodoList();
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    fetchTodoList();
  }, [todos]);

  const startEditing = (todo) => {
    setEditingId(todo._id || todo.id);
    setEditTitle(todo.title);
    setEditDescription(todo.description);
  };

  const saveEdit = (id) => {
    if (!editTitle.trim()) return;
    handleEdit(id, { title: editTitle, description: editDescription });
    setEditingId(null);
  };

  return loading ? (
    <LoadingSpinner />
  ) : (
    <div className="table-container">
      <table className="todo-table">
        <thead>
          <tr
            style={{
              backgroundColor: "#f4f4f4",
              borderBottom: "2px solid #ddd",
            }}
          >
            <th style={{ width: "50px", textAlign: "center" }}></th>
            <th style={{ padding: "12px" }}>Title</th>
            <th style={{ padding: "12px" }}>Description</th>
            <th style={{ width: "120px" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {updatedTodos.map((todo, index) => {
            const todoId = todo?._id || todo?.id || index;
            const isEditing = editingId === todoId;

            return (
              <tr
                key={todoId}
                className={todo.done ? "todo-row-done" : ""}
                aria-disabled={!!todo.done}
              >
                {/* Checkbox Section */}
                <td style={{ padding: "12px", textAlign: "center" }}>
                  <input
                    type="checkbox"
                    checked={!!todo.done}
                    onChange={() =>
                      handleToggleDone && handleToggleDone(todoId)
                    }
                    style={{ cursor: "pointer", width: "18px", height: "18px" }}
                  />
                </td>
                {/* Title (with strike-through effect if done) */}
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      style={{
                        padding: "6px",
                        fontSize: "14px",
                        width: "90%",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: todo.done ? "line-through" : "none",
                        color: todo.done ? "#888" : "#000",
                      }}
                    >
                      {todo.title}
                    </span>
                  )}
                </td>
                {/* Description */}
                <td>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      style={{
                        padding: "6px",
                        fontSize: "14px",
                        width: "90%",
                        borderRadius: "4px",
                        border: "1px solid #cbd5e1",
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        fontWeight: "bold",
                        textDecoration: todo.done ? "line-through" : "none",
                        color: todo.done ? "#888" : "#000",
                      }}
                    >
                      {todo?.description}
                    </span>
                  )}
                  {/* Action*/}
                </td>

                <td style={{ padding: "12px", whiteSpace: "nowrap" }}>
                  {isEditing ? (
                    <button
                      onClick={() => saveEdit(todoId)}
                      style={{
                        marginRight: "8px",
                        cursor: "pointer",
                        background: "#28a745",
                        color: "#fff",
                        border: "none",
                        padding: "4px 8px",
                        borderRadius: "4px",
                      }}
                      disabled={!!todo.done}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => startEditing(todo)}
                      title="Edit"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginRight: "8px",
                      }}
                      disabled={!!todo.done}
                    >
                      ✏️
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(todoId)}
                    title="Delete"
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                    disabled={!!todo.done}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TodoList;
