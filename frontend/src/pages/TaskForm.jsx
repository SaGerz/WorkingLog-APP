import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../utils/AxiosInstance';


const TaskForm = () => {

    const [taskData, setTaskData] = useState({
        task_name: '',
        description: '',
        start_time: '',
        end_time: ''
    })

    const navigate = useNavigate();

    const handleChage = (e) => {
        e.preventDefault();
        setTaskData({
            ...taskData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if(!token) {
                alert('You Have to login First');
                navigate('/login');
            } 

            const response = await AxiosInstance.post('/tasks', taskData)
            const data = response.data;
            if(data){
                alert('Task created successfully');
                navigate('/TaskList');
                setTaskData({ task_name: '', description: '', start_time: '', end_time: '' });
            } else {
                alert(data.message || "Failed to create task")
            }
        } catch (error) {
            console.log('Error : ', error );
        }
    }

    return (
        <div className='max-w-lg mx-auto bg-white p-6 rounded-md shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>Create New Task</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Task Name</label>
                    <input 
                        type="text"  
                        name='task_name'
                        value={taskData.task_name}
                        onChange={handleChage}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        name='description'
                        value={taskData.description}
                        onChange={handleChage}
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                        type="time"
                        name='start_time'
                        value={taskData.start_time}
                        onChange={handleChage}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                        type="time"
                        name='end_time'
                        value={taskData.end_time}
                        onChange={handleChage}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save Task
            </button>
        </form>
        </div>
    )
}

export default TaskForm