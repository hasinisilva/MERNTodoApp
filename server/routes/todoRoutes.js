const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET /api/todos: Fetch and return all TODO documents
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/todos: Validate request data and create a new TODO document
router.post('/', async (req, res) => {
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
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/todos/:id: Find a TODO by ID and update its title and/or description
router.put('/:id', async (req, res) => {
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

    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH /api/todos/:id/done: Toggle the done status of a specific TODO
router.patch('/:id/done', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    // Toggle the boolean state
    todo.done = !todo.done;
    const updatedTodo = await todo.save();
    
    res.json(updatedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE /api/todos/:id: Remove a TODO document by its ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json({ message: 'Todo deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;