import { useState } from "react";
import { createTodo } from "../../../server/services/todoService";
import '../styles/todoForm.css';

export default function TodoForm({ onTodoAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    try {
      const savedTodo = await createTodo({
        title: title,
        description: description,
        done: false,
      }).then(async () => {
        setTitle("");
        setDescription("");
      });
      if (onTodoAdded) onTodoAdded(savedTodo); // Refresh list or state
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="todo-input"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="todo-input"
          />
        </div>
        <button type="submit" className="todo-button" disabled={!title}>
          Add Task
        </button>
      </form>
    </>
  );
}
