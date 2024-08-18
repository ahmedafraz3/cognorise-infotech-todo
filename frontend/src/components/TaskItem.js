import React from 'react';  

const TaskItem = ({ task, onDelete, onEdit }) => {  
    return (  
        <li className="list-group-item d-flex justify-content-between align-items-center">  
            {task.title}  
            <div>  
                <button className="btn btn-warning btn-sm" onClick={() => onEdit(task)}>Edit</button>  
                <button className="btn btn-danger btn-sm ml-2" onClick={() => onDelete(task._id)}>Delete</button>  
            </div>  
        </li>  
    );  
};  

export default TaskItem;