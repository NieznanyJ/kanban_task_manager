import React, { useContext, useEffect, useRef, useState } from 'react'
import TaskWindow from './TaskWindow';
import { themeContext } from '../../context/Context';




function Task({ taskId, boardId, title, description, subtasks, status, dragStart, dragEnd, setShowTaskWindow, showTaskWindow, getTasks }) {

    const [checked, setChecked] = useState(subtasks.filter(subtask => subtask.checked === true).length)
    const [theme, setTheme] = useContext(themeContext)
    const [currentTask, setCurrentTask] = useState(null);
    const [subtaskDone, setSubtaskDone] = useState(subtasks.filter(subtask => subtask.checked === true).length )


    const selectTask = (e) => {


        const selectedTask = {
            taskId: taskId,
            boardId: boardId,
            title: title,
            description: description,
            subtasks: subtasks,
            status: status
        }


        setCurrentTask(selectedTask)

    }


   /*  useEffect(() => {
        getTasks()
    }, [checked]) */


    return (
        <>
            
                <div
                    onClick={
                        (e) => {
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
                    {subtasks.length ? <p className='nr-of-subtasks body-m'> {subtaskDone} of {subtasks.length} subtasks</p> : null}

                </div>
                {currentTask && showTaskWindow && <TaskWindow getTasks={getTasks}  setShowTaskWindow={setShowTaskWindow} subtaskDone={subtaskDone} setSubtaskDone={setSubtaskDone} checked={checked} setChecked={setChecked} currentTask={currentTask}></TaskWindow>}
           
        </>

    )
}



export default Task
