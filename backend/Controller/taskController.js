const db = require('../Models/db');

const createTask = async (req, res) => {
    const { task_name, description, start_time, end_time, employee_id } = req.body;

    if(!task_name || !description || !start_time || !end_time || !employee_id) {
        return res.status(400).json({message: 'Semua data wajib diisi'});
    }

    const query = `
    INSERT INTO task(task_name, description, start_time, end_time, employee_id) VALUES (?, ?, ?, ?, ?)
    `;
    try {
        const [result] = await db.query(query, [task_name, description, start_time, end_time, employee_id]);
        res.status(201).json({message: "Task berhasil ditambahkan", taskId: result.insertId});
    } catch (error) {
        return res.status(500).json({message: 'Gsgal menambahkan task', error: err})
    }

    
    // db.query(query, [task_name, description, start_time, end_time, employee_id], (err, result) => {
    //     if(err){
    //         return res.status(500).json({message: 'Gsgal menambahkan task', error: err})
    //     } 

    //     res.status(201).json({message: "Task berhasil ditambahkan", taskId: result.insertId});
    // })
}

const getTaskByEmployee = async (req, res) => {
    const {employee_id} = req.params;

    if(!employee_id){
        res.status(400).json({message: 'Employee ID wajib diisi'})
    }

    const query = `SELECT * FROM task WHERE employee_id = ?`;

    try {
        const [result] = await db.query(query, [employee_id])
        res.status(200).json({tasks: result});
    } catch (error) {
        res.status(500).json({message: 'Gagal Mengambil task', error: err});
    }

    // db.query(query, [employee_id], (err, result) => {
    //     if(err){
    //         res.status(500).json({message: 'Gagal Mengambil task', error: err});
    //     }

    //     res.status(200).json({tasks: result});
    // });
}

module.exports = {createTask, getTaskByEmployee}