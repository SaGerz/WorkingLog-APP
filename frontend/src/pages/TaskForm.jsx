import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../utils/AxiosInstance';
import { AiOutlineClockCircle } from "react-icons/ai";


const TaskForm = () => {

    const [taskData, setTaskData] = useState({
        task_name: '',
        description: '',
        start_time: '',
        end_time: '',
        status: 'On Process'
    })

    const navigate = useNavigate();

    const handleChange = (e) => {
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
                setTaskData({ task_name: '', description: '', start_time: '', end_time: '', status: 'On Process' });
            } else {
                alert(data.message || "Failed to create task")
            }
        } catch (error) {
            console.log('Error : ', error );
            if(error.response.status === 401)
            {
                navigate('/');
            }
        }
    }

    useEffect(() => {
        if(!localStorage.getItem('token'))
        {
            navigate('/');
        }
      }, []);
      

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
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        name='description'
                        value={taskData.description}
                        onChange={handleChange}
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <div className="relative">
                        <input 
                            type="time"
                            name="start_time"
                            value={taskData.start_tim}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 pr-12 border border-gray-300 rounded-md cursor-pointer text-gray-900"
                            id='timeInput_StartTime'
                            required
                        />
                        <AiOutlineClockCircle 
                            className="absolute inset-y-2 right-3 flex items-center text-gray-500 cursor-pointer hover:text-gray-700"
                            size={25} onClick={() => document.getElementById('timeInput_StartTime').showPicker()}

                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <div className="relative">
                        <input
                            type="time"
                            name='end_time'
                            value={taskData.end_time}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                            id='timeInput_EndTime'
                            required
                        />
                        <AiOutlineClockCircle 
                                className="absolute inset-y-2 right-3 flex items-center text-gray-500 cursor-pointer hover:text-gray-700"
                                size={25} onClick={() => document.getElementById('timeInput_EndTime').showPicker()}
                        />
                        </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <select
                        name='status'
                        value={taskData.status}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    >
                        <option value="On Process">On Process</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Save Task
            </button>
        </form>
        </div>
    )
}

export default TaskForm