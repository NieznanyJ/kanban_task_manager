import React, { useState } from 'react'


function Task({ id, title, description, subtasks, status, dragStart, dragEnd, setShowTaskWindow, setCurrentTask }) {


    const selectTask = (id) => {
        const taskItems = document.querySelectorAll(".task");
        
        const selectedTask = {
            id: id,
            title: title,
            description: description,
            subtasks: subtasks,
            status: status
        }

        setCurrentTask(selectedTask)
   

    }




return (
    <div
    onClick={
        () => {
            selectTask(title)
            setShowTaskWindow(true)
        }
    }
        onDragStart={dragStart}
        onDragEnd={dragEnd}
        draggable="true"
        className="task draggable"
        id={id}>

        <h3 className='task-title heading-m'>{title}</h3>
        <p className='nr-of-subtasks body-m'> 0 of {subtasks.length} subtasks</p>
    </div>
)
}



export default Task
