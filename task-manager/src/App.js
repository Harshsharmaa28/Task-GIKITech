import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskText, setTaskText] = useState('');

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { text: taskText, completed: false }]);
      setTaskText('');
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Personal Task Manager</h1>
      <div className="w-full max-w-md p-4 bg-white rounded shadow-md">
        <div className="flex mb-4">
          <input
            type="text"
            className="flex-grow p-2 border rounded-l-md"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <TaskList tasks={tasks} deleteTask={deleteTask} toggleTaskCompletion={toggleTaskCompletion} />
      </div>
    </div>
  );
}

export default App;
