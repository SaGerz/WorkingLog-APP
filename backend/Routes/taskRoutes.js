const express = require('express');
const {createTask, getTaskByEmployee} = require('../Controller/taskController');
const {authenticate} = require('../Middlewares/authMiddlewares')
const router = express.Router();

router.post('/tasks', authenticate, createTask);
router.get('/tasks', authenticate, getTaskByEmployee);

module.exports = router;