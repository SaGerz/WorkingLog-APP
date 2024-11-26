const express = require('express');
const {createTask, getTaskByEmployee} = require('../Controller/taskController');
const router = express.Router();

router.post('/tasks', createTask);
router.get('/tasks/:employee_id', getTaskByEmployee);

module.exports = router;