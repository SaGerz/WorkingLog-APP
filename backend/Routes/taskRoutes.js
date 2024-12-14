const express = require('express');
const {createTask, getTaskByEmployee, updateTaskByEmployee, deleteTask, getTaskById} = require('../Controller/taskController');
const {authenticate} = require('../Middlewares/authMiddlewares')
const router = express.Router();

router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTaskByEmployee);
router.get('/tasks/:id', authenticate, getTaskById);
router.put('/tasks/:id', authenticate, updateTaskByEmployee);
router.delete('/tasks/:id', authenticate, deleteTask);


module.exports = router;