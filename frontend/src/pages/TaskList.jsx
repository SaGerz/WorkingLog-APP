import React, { useEffect, useState } from 'react'
// import {formatTime} from '../utils/FormatTime';
import FormatTime from '../utils/FormatTime';
import TaskItem from '../components/TaskItem'
import { useNavigate } from 'react-router-dom';
import AxiosInstance from '../utils/AxiosInstance';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState('');

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
        // console.error('Error Fetching task : ', error);
    }

  }

  const handleFilterChange = (e) => {
    e.preventDefault();
    setFilter(e.target.value);
  }

  // const filteredTask = tasks.filter((task) => {
  //   if(filter === "All") return true;
  //   return task.status === filter;
  // })

  const filteredTask = tasks.filter((task) => {
    const statusMatch = filter === "All" || task.status === filter;

    const searchMatch = 
      searchTerm === '' || 
      task.task_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLocaleLowerCase())

    return statusMatch && searchMatch;
  })

  const groupedTasksByDate = filteredTask.reduce((grouped, task) => {
    // Ambil tanggal saja dari created_at, buang waktu
    const taskDate = new Date(task.created_at).toLocaleDateString();
    if (!grouped[taskDate]) {
      grouped[taskDate] = [];
    }
    grouped[taskDate].push(task);
    return grouped;
  }, {});

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Apa kamu yakin ingin menghapus task ini?");
    if(!confirmDelete) return ;

    try {
      const response = await AxiosInstance.delete(`tasks/${id}`);
      if(response.status === 200) {
        alert('Data Berhasil Dihapus');
        setTasks((prevTasks => prevTasks.filter(task => task.id !== id)))
      }
    } catch (error) {
        console.log("Error deleting data task : ", error);
        alert("Gagal menghapus data");
    }
  }

  useEffect(() => {
    fetchDataTasks();
  }, [])


  return (
    <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Working History</h2>
            <div className='mt-2 flex space-x-4'>
              <select value={filter} onChange={handleFilterChange} className="border border-gray-300 rounded-md mb-3 p-2">
                <option value="All">All</option>
                <option value="On Process">On Proccess</option>
                <option value="Done">Done</option>
              </select>
              <input 
                type="text" 
                placeholder="Search task..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md mb-3"
              />

              <button onClick={() => {navigate("/TaskForm")}} className="px-4 py-2 bg-green-500 text-white rounded-md mb-3 hover:bg-green-600 transition" >
                  Add New Task
              </button>
            </div>
              {Object.entries(groupedTasksByDate).map(([date, tasks]) => (
                <div key={date} className="mb-6">
                  <h3 className="text-lg font-semibold mb-2">{FormatTime.formatDate(date)}</h3>
                  <div className="space-y-2">
                    {tasks.map(task => (
                      <TaskItem key={task.id} task={task} handleDelete={handleDelete} />
                    ))}
                  </div>
                </div>
              ))}
        </div>
  )
}

export default TaskList;