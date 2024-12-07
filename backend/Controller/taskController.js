const db = require('../Models/db');

const createTask = async (req, res) => {
    const { task_name, description, start_time, end_time } = req.body;

    if(!task_name || !description || !start_time || !end_time ) {
        return res.status(400).json({message: 'Semua data wajib diisi'});
    }
    try {
        const {employeeId} = req.user;
        console.log(employeeId);
        const query = `
        INSERT INTO task(task_name, description, start_time, end_time, employee_id) VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [task_name, description, start_time, end_time, employeeId]);
        res.status(201).json({message: "Task berhasil ditambahkan", taskId: result.insertId});
    } catch (error) {
        return res.status(500).json({message: 'Gsgal menambahkan task', error})
    }
}

const getTaskByEmployee = async (req, res) => {    
    try {
        const {employeeId} = req.user;

        const query = `SELECT * FROM task WHERE employee_id = ?`;
        const [results] = await db.query(query, [employeeId]);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({message: 'Gagal Mengambil task', error});
    }
}

module.exports = {createTask, getTaskByEmployee}