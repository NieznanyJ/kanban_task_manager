import React, { useContext, useRef, useState } from 'react'
import Overlay from '../Overlay'
import { AppContext } from '../../context/Context'
import IconChevronDown from '../icons/IconChevronDown';
import IconChevronUp from '../icons/IconChevronUp';


function TaskWindow({ currentTask, setShowTaskWindow, getTasks }) {

    const [boards, setBoards, currentBoard] = useContext(AppContext);

    const [checked, setChecked] = useState(0)
    const [curr, setCurr] = useState(currentTask.status)
    const [currentOption, setCurrentOption] = useState(currentTask.status)
    const [statusBox, setStatusBox] = useState(false)


    const putStatus = async (newStatus, taskId) => {
            
            try{
                const response = await fetch(`http://localhost:8000/tasks/${taskId}/${currentTask.username}/${currentBoard.title}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newStatus),
                })
                const json = await response.json()
                console.log(json)

            }catch(error){
                console.error(error)
            }
    }

    const changeStatus = (curr) => {
        
        setCurr(curr)

        const newStatus = {
            taskId: currentTask.taskId,
            boardId: currentTask.boardId,
            status: curr
        }
        putStatus(newStatus, newStatus.taskId)
        getTasks()
    }

    const setCheckedSubtasks = (e) => {

        const subtasks  = document.querySelectorAll('.subtask-title')
        const checkboxes = document.querySelectorAll('.subtask-checkbox')

        let check = checked
        if(e.target.checked){
            check++
            subtasks.forEach((subtask,index) => {
                if(subtask.id === e.target.id){
                    subtask.style.textDecoration = 'line-through'
                }  
            })
        }
        else{
            check--
            subtasks.forEach((subtask,index) => {
                if(subtask.id === e.target.id){
                    subtask.style.textDecoration = 'none'
                }  
            })
            
        }

        setChecked(check)

    }

    return (
        <>
            <Overlay setShowTaskWindow={setShowTaskWindow}></Overlay>
            <div className='add-new-from'>
                <h3 className="task-title heading-l">{currentTask.title}</h3>
                <p className="task-description body-l">{currentTask.title}</p>
                <label htmlFor="subtasks" className='body-l'>Subtasks ({checked} of {currentTask.subtasks.length})</label>
                <ul className="subtask-list">
                    {currentTask.subtasks && currentTask.subtasks.map((subtask, index) => {
                        return (
                            <div className="subtask-container" key={index} >
                                <input id={index} className='subtask-checkbox' type="checkbox"  onClick={setCheckedSubtasks}/>
                                <h4 id={index} className='subtask-title body-l'>{subtask.title}</h4>
                            </div>
                        )
                    })}
                </ul>
                <div className="add-new-input-box">
                    <label htmlFor="task-status" className='body-l'>Current Status</label>
                    <div name="task-status" id='task-status' className="selection-box" onClick={(e) => { 
                        setStatusBox(prev => { return !prev }) 
                        e.target.classList.toggle('selection-box-active')
                        }}>
                        <p className="current-option body-l">{currentOption}</p>
                        {statusBox ? <IconChevronUp></IconChevronUp> : <IconChevronDown></IconChevronDown>}
                        {statusBox && <div className="option-box">
                            {currentBoard.columns && currentBoard.columns.map((column) => {
                                return (<p key={column.id} className="option body-l" onClick={() => {
                                     setCurrentOption(curr) 
                                     changeStatus(column)
                                    }}
                                     >{column}</p>)
                            })}
                        </div>}
                    </div>


                </div>
            </div >
        </>
    )
}

export default TaskWindow