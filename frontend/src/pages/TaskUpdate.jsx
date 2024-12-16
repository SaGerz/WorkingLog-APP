import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AxiosInstance from '../utils/AxiosInstance';

const TaskUpdate = () => {
    const { id } = useParams(); // Ambil ID dari URL
    const navigate = useNavigate();
    const [task, setTask] = useState(null); // State untuk task
    const [formData, setFormData] = useState({
        task_name: '',
        description: '',
        start_time: '',
        end_time: '',
        status: 'On Process'
    });

    useEffect(() => {
        getDataTaskById();
    }, []);

    const getDataTaskById = async () => {
        try {
            const response = await AxiosInstance.get(`/tasks/${id}`);
            console.log(response);
            
            const result = response.data?.result[0];
            if (result) {
                    setTask(result); // Simpan task di state
                    setFormData({
                        task_name: result.task_name,
                        description: result.description,
                        start_time: result.start_time,
                        end_time: result.end_time,
                        status: result.status
                    });
            } else {
                console.error('Fetch Data by ID Failed');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                console.error('Error Fetching Task:', error);
            }
        }
    };


    const handleChage = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('You have to login first');
                navigate('/login');
                return;
            }

            const response = await AxiosInstance.put(`/tasks/${id}`, formData);
            const data = response.data;

            if (data) {
                alert('Task updated successfully');
                navigate('/TaskList');
            } else {
                alert(data.message || 'Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('An error occurred while updating the task.');
        }
    };

    if (!task) {
        return <p>Loading ya wirr...</p>;
    }

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Update ur Task</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Task Name</label>
                    <input
                        type="text"
                        name="task_name"
                        value={formData.task_name}
                        onChange={handleChage}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        name="description"
                        value={formData.description}
                        onChange={handleChage}
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                        type="time"
                        name="start_time"
                        value={formData.start_time}
                        onChange={handleChage}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                        type="time"
                        name="end_time"
                        value={formData.end_time}
                        onChange={handleChage}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name='status'
                        value={formData.status}
                        onChange={handleChage}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="On Process">On Process</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Save Task
                </button>
            </form>
        </div>
    );
};

export default TaskUpdate;
