import React from 'react';

function TaskList({ tasks, deleteTask, toggleTaskCompletion }) {
  return (
    <ul className="list-none p-0">
      {tasks.map((task, index) => (
        <li key={index} className="flex items-center justify-between mb-2">
          <span
            onClick={() => toggleTaskCompletion(index)}
            className={` hover:cursor-pointer flex-grow ${task.completed ? 'line-through text-gray-500' : ''}`}
          >
            {task.text}
          </span>
          <button
            onClick={() => deleteTask(index)}
            className="ml-4 p-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
