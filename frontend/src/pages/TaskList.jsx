import React, { useEffect, useState } from 'react'
import formatTime from '../utils/FormatTime';
import TaxItem from '../components/TaksItem'
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../utils/AxiosInstance';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  // const token = localStorage.getItem('token');

  const fetchDataTasks = async () => {
    try {
      // if(!token) {
      //   alert('U Have to Login first');
      //   navigate("/Login");  
      // }
      
      const response = await AxiosInstance.get('/tasks');

      if(response.data){
        setTasks(response.data);
      } else {
        console.error('Failed to fetch Data');
      }
    } catch (error) {
      if(error.response.status === 401) {
        navigate("/Login");
      }
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
                  tasks.map(task  => (
                    <TaxItem key={task.id} task={task}/>
                  ))
                }
        </div>
  )
}

export default TaskList;