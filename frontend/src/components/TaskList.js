import React, { useEffect, useState } from 'react';  
import TaskItem from './TaskItem';  
import axios from 'axios';  
import 'bootstrap/dist/css/bootstrap.min.css';  

function TaskList() {  
    const [tasks, setTasks] = useState([]);  
    const [taskTitle, setTaskTitle] = useState('');  
    const [completed, setCompleted] = useState(false);  
    const [editingTask, setEditingTask] = useState(null);  

    useEffect(() => {  
        const fetchTasks = async () => {  
            const response = await axios.get('http://localhost:4000/api/tasks');  
            setTasks(response.data);  
        };  
        fetchTasks();  
    }, []);  

    const addTask = async () => {  
        if (!taskTitle) return;  
        const response = await axios.post('http://localhost:4000/api/tasks', { title: taskTitle, completed });  
        setTasks([...tasks, response.data]);  
        setTaskTitle('');  
        setCompleted(false); // Reset completed status for new task  
    };  

    const updateTask = async (task) => {  
        try {  
            const response = await axios.put(`http://localhost:4000/api/tasks/${task._id}`, { title: taskTitle, completed });  
            setTasks(tasks.map(t => (t._id === response.data._id ? response.data : t))); // Update the task list  
            setEditingTask(null);   // Reset editing task  
            setTaskTitle('');  
            setCompleted(false); // Reset completed status  
        } catch (error) {  
            console.error("Error updating task:", error);  
            alert("Failed to update task. Please try again later.");  
        }  
    };  

    const deleteTask = async (id) => {  
        await axios.delete(`http://localhost:4000/api/tasks/${id}`);  
        setTasks(tasks.filter(task => task._id !== id));  
    };  

    const handleEdit = (task) => {  
        setEditingTask(task);  
        setTaskTitle(task.title);  
        setCompleted(task.completed); // Set completed status for editing  
    };  

    return (  
        <div className="container-fluid mt-5 " style={{color:'aliceblue'}}>  
            <h1 className="mb-4">To-Do List</h1> 
            <div className="row"> 
            <div className="input-group mb-3 col">  
                <input  
                    type="text"  
                    className="form-control"  
                    value={taskTitle}  
                    onChange={(e) => setTaskTitle(e.target.value)}  
                    placeholder="Enter task title"  
                />  
                <button className="btn btn-primary" onClick={editingTask ? () => updateTask(editingTask) : addTask}>  
                    {editingTask ? 'Update Task' : 'Add Task'}  
                </button>  
            </div> 
            <div className="col"></div>
            </div> 
            
            <div className="form-check mb-3">  
                <input  
                    type="checkbox"  
                    className="form-check-input"  
                    checked={completed}  
                    onChange={(e) => setCompleted(e.target.checked)}  
                    id="completedCheckbox"  
                />  
                <label className="form-check-label" htmlFor="completedCheckbox">  
                    Mark as completed  
                </label>  
            </div>  
            <div className="row">
            <ul className="list-group col mx-2">  
                {tasks.map(task => (  
                    <TaskItem key={task._id} task={task} onDelete={deleteTask} onEdit={handleEdit} />  
                ))}  
            </ul> 
            <div className="col"></div>
            </div> 
        </div>  
    );  
}  

export default TaskList;