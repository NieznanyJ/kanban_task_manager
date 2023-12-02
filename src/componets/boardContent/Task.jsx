import React, { useContext, useEffect, useRef, useState } from 'react'
import TaskWindow from './TaskWindow';
import { themeContext } from '../../context/Context';


function Task({ taskId, boardId, title, description, subtasks, status, dragStart, dragEnd, setShowTaskWindow, showTaskWindow, setCurrentTask, currentTask, getTasks }) {

    const [checked, setChecked] = useState(subtasks.filter(subtask => subtask.checked === true).length)
    const [theme, setTheme] = useContext(themeContext)

    const selectTask = (taskId) => {
        const taskItems = document.querySelectorAll(".task");

        const selectedTask = {
            taskId: taskId,
            boardId: boardId,
            title: title,
            description: description,
            subtasks: subtasks,
            status: status
        }

        console.log(selectedTask)

        setCurrentTask(selectedTask)


    }


    useEffect(() => {
        getTasks()
    },[checked])


    return (
        <>
            <div
                onClick={
                    () => {
                        selectTask(taskId)
                        setShowTaskWindow(true)
                    }
                }
                onDragStart={dragStart}
                onDragEnd={dragEnd}
                draggable="true"
                className={theme === 'light' ? 'light-theme task draggable' : 'task draggable'}
                id={taskId}>

                <h3 className='task-title heading-m'>{title}</h3>
                {subtasks.length ? <p className='nr-of-subtasks body-m'> {checked} of {subtasks.length} subtasks</p> : null}

            </div>
            {currentTask && showTaskWindow && <TaskWindow getTasks={getTasks}  setShowTaskWindow={setShowTaskWindow} checked={checked} setChecked={setChecked} currentTask={currentTask}></TaskWindow>}
            </>

    )
}



export default Task
