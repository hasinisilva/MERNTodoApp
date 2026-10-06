const express = require('express');
const router = express.Router();
const { getAllTodos, createTodo, updateTodo, toggleTodoDone, deleteTodo } = require('../controllers/todoController');

// GET /api/todos: Fetch and return all TODO documents
router.get('/', getAllTodos);

// POST /api/todos: Validate request data and create a new TODO document
router.post('/', createTodo);

// PUT /api/todos/:id: Find a TODO by ID and update its title and/or description
router.put('/:id', updateTodo);

// PATCH /api/todos/:id/done: Toggle the done status of a specific TODO
router.patch('/:id/done', toggleTodoDone);

// DELETE /api/todos/:id: Remove a TODO document by its ID
router.delete('/:id', deleteTodo);

module.exports = router;