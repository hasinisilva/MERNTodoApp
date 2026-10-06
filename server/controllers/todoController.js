const Todo = require('../models/Todo');

// Reusable controller function for fetching all todos
const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    return res.json(todos);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validation
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const newTodo = new Todo({
      title: title.trim(),
      description: description ? description.trim() : '',
    });

    const savedTodo = await newTodo.save();
    return res.status(201).json(savedTodo);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const updateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    const updateData = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json(updatedTodo);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const toggleTodoDone = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Toggle the boolean state
    todo.done = !todo.done;
    const updatedTodo = await todo.save();
    
    return res.json(updatedTodo);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    return res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllTodos,
  createTodo,
  updateTodo,
  toggleTodoDone,
  deleteTodo
};