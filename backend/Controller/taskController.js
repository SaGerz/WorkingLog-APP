const db = require('../Models/db');

const createTask = async (req, res) => {
    const { task_name, description, start_time, end_time, status } = req.body;

    if(!task_name || !description || !start_time || !end_time || !status ) {
        return res.status(400).json({message: 'Semua data wajib diisi'});
    }

    const validStatus = ["On Process", "Done"];
    if(!validStatus.includes(status)){
        return res.status(500).json({message : "Status tidak valid. Pilihan: On Process atau Done" });
    }

    try {
        const {employeeId} = req.user;
        console.log(employeeId);
        const query = `
        INSERT INTO task(task_name, description, start_time, end_time, employee_id, status) VALUES (?, ?, ?, ?, ?, ?)
        `;

        const [result] = await db.query(query, [task_name, description, start_time, end_time, employeeId, status]);
        res.status(201).json({message: "Task berhasil ditambahkan", taskId: result.insertId});
    } catch (error) {
        return res.status(500).json({message: 'Gsgal menambahkan task', error})
    }
}

const getTaskByEmployee = async (req, res) => {    
    try {
        const {employeeId} = req.user;

        const query = `SELECT * FROM task WHERE employee_id = ? ORDER BY created_at DESC`;
        const [results] = await db.query(query, [employeeId]);

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({message: 'Gagal Mengambil task', error});
    }
}

const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { employeeId } = req.user;

        const query = `SELECT * FROM task WHERE id = ? AND employee_id = ?`;
        const [result] = await db.query(query, [id, employeeId]);

        if(result.length === 0) {
            return res.status(404).json({message: "Task tidak dapat ditemukan atau bukan milik anda"});
        } 

        res.status(200).json({result});
    } catch (error) {
        res.status(500).json({ message: 'Gagal mengambil task', error });
    }
}

const updateTaskByEmployee = async (req, res) => {
    const { id } = req.params;
    const { task_name, description, start_time, end_time, status } = req.body;

    try {
        if(!task_name || !description || !start_time || !end_time || !status){
            return res.status(400).json({message: "Semua data wajib diisi!"});
        }

        const { employeeId } = req.user;

        const checkQuery = `SELECT * FROM task WHERE id = ? && employee_id = ?`;
        const [existingTask] = await db.query(checkQuery, [id, employeeId]);

        if(existingTask.length === 0) {
            return res.status(404).json({message: "Task tidak ditemukan atau tidak memiliki Akses"});
        }

        const updateQuery = `UPDATE task SET task_name = ?, description = ?, start_time = ?, end_time = ?, status = ? WHERE id = ? AND employee_id = ?`
        await db.query(updateQuery, [task_name, description, start_time, end_time, status, id, employeeId]);
        res.status(200).json({ message: 'Task berhasil diperbarui' });

    } catch (error) {
        return res.status(500).json({message: "Gagal Memperbarui Task"});
    } 
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    const { employeeId } = req.user;

    try {
        if(!id) {
            return res.status(400).json({message: "Id task wajib disertakan"});
        }

        const deleteQuery = `DELETE FROM task WHERE id = ? AND employee_id = ?`;
        const [result] = await db.query(deleteQuery, [id, employeeId]);

        if(result.affectedRows === 0) {
            return res.status(400).json({message: "Task tidak ditemukan atau bukan milik Anda"});
        }
        
        return res.status(200).json({message: "Task berhasil diapus"});
    } catch (error) {
        return res.status(500).json({message: "Gagal menghapus task", error});
    }


}

module.exports = {createTask, getTaskByEmployee, getTaskById, updateTaskByEmployee, deleteTask}