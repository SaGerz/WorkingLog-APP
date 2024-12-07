import React, { useEffect, useState } from 'react'
import formatTime from '../utils/FormatTime';


const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  const fetchDataTasks = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if(response.ok){
        const data = await response.json();
        setTasks(data);
      } else {
        console.error('Failed to fetch Data');
      }
    } catch (error) {
        console.error('Error Fetching task : ', error);
    }

  }

  useEffect(() => {
    fetchDataTasks();
  }, [])


  return (
    <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
                {tasks.length === 0 ? 
                  <p>No task Available, Create one!</p> 
                    :          
                  <ul className="space-y-4">
                    {tasks.map((task) => (
                          <li key={task.id} className="p-4 bg-white shadow-md rounded-md">
                              <h3 className="text-lg font-bold">{task.task_name}</h3>
                              <p className="text-sm text-gray-600">{task.description}</p>
                              <p className="text-sm text-gray-500">
                                  Start: {formatTime(task.start_time)}
                              </p>
                              <p className="text-sm text-gray-500">
                                  End: {formatTime(task.end_time)}
                              </p>
                          </li>
                    ))}
                  </ul>
                }
        </div>
  )
}

export default TaskList