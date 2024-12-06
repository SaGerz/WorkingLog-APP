import React, {useState} from 'react'

const TaskForm = () => {
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({taskName, description, startTime, endTime});
    }

    return (
        <div className='max-w-lg mx-auto bg-white p-6 rounded-md shadow-md'>
            <h2 className='text-2xl font-semibold mb-4'>Create New Task</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Task Name</label>
                    <input 
                        type="text"  
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md" 
                        required />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows="3"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
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