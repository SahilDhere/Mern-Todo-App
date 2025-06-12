const express = require('express');
const { getTodos, getTodo, AddTodo, editTodo, deleteTodo } = require('../controller/Todo');
const auth = require('../middleware/auth');
const router = express.Router();


router.get("/", auth, getTodos);
router.get("/:id", auth, getTodo);
router.post("/", auth, AddTodo);
router.put("/:id", auth, editTodo);
router.delete("/:id", auth, deleteTodo)

module.exports = router;