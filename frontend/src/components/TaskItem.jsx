import { useNavigate } from "react-router-dom";
import formatTime from "../utils/FormatTime";

const TaxItem = ({task, handleDelete}) => {
    const navigate = useNavigate();
    const handleUpdateNavigate = () => {
        navigate(`/Task-Update/${task.id}`)
    }
    
    return (
        <ul className="space-y-4">
            <li key={task.id} className="p-4 bg-white shadow-md rounded-md mb-1">
                <h3 className="text-lg font-bold">{task.task_name}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm text-gray-500">
                    Start: {formatTime(task.start_time)} - End: {formatTime(task.end_time)}
                </p>
                <div className="mt-4 flex space-x-2">
                    <button onClick={handleUpdateNavigate} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition" >
                            Update
                    </button>
                    <button onClick={() => handleDelete(task.id) } className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition" >
                            Delete
                    </button>
                </div>
            </li>
      </ul>
    )
}


export default TaxItem;