import formatTime from "../utils/FormatTime";

const TaxItem = ({task}) => {
    return (
        <ul className="space-y-4">
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
      </ul>
    )
}


export default TaxItem;