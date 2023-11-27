import React, { useContext, useEffect, useRef, useState } from 'react'
import Overlay from '../Overlay'
import { AppContext, ModalBoxContext } from '../../context/Context'
import IconChevronDown from '../icons/IconChevronDown';
import IconChevronUp from '../icons/IconChevronUp';
import IconElipse from '../icons/IconElipse';
import TaskOptionModal from './TaskOptionModal';



function TaskWindow({ currentTask, setShowTaskWindow, getTasks, checked, setChecked }) {

    const [boards, setBoards, currentBoard] = useContext(AppContext);
    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext)

    const curr = useRef(currentTask.status)
    const col = useRef(null)
    const [currentOption, setCurrentOption] = useState(currentTask.status)
    const [statusBox, setStatusBox] = useState(false)
    const [subtaskDone, setSubtaskDone] = useState(currentTask.subtasks.filter(subtask => subtask.checked === true).length)
    const [showTaskOptionModal, setShowTaskOptionModal] = useState(false)
    


    const checkSubtask =  async (checkedTasks) =>{

        try{
            const response = await fetch(`http://localhost:8000/tasks/${currentTask.username}/${currentBoard.title}/${currentTask.taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkedTasks),
            })
            const json = await response.json()
            console.log(json)
            getTasks()

        }catch(error){
            console.error(error)
        }
    }

    


    useEffect(() => {
        const checkboxes = document.querySelectorAll('.subtask-checkbox')
        const subtasks  = document.querySelectorAll('.subtask-title')

        let check = checked
        console.log(check)

        checkboxes.forEach((checkbox, index) => {
            if (check){
                checkboxes[check-1].checked = true
                subtasks[check-1].style.textDecoration = 'line-through'
                check--
            }
            else{
                checkboxes[check].checked = false
                /* subtasks[check-1].style.textDecoration = 'none' */
            }
            
            
        })

    },[])
    
    const putStatus = async (newStatus) => {
            
            try{
                const response = await fetch(`http://localhost:8000/tasks/${currentTask.username}/${currentBoard.title}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newStatus),
                })
                const json = await response.json()
                console.log(json)
                getTasks()

            }catch(error){
                console.error(error)
            }
    }

    const changeStatus = (column) => {
        
        curr.current = column

        console.log(currentTask.taskId)
        console.log(currentTask)
        const newStatus = {
            taskId: currentTask.taskId,
            boardId: currentTask.boardId,
            status: curr.current
        }

        setCurrentOption(curr.current)
        putStatus(newStatus)
        
        
    }


    const setCheckedSubtasks = (e) => {

        const subtasks  = document.querySelectorAll('.subtask-title')
        const checkboxes = document.querySelectorAll('.subtask-checkbox')

        
        console.log(subtasks[e.target.id])

        let check = checked

        currentTask.subtasks[e.target.id].checked = !currentTask.subtasks[e.target.id].checked
        subtasks[e.target.id].style.textDecoration = currentTask.subtasks[e.target.id].checked ? 'line-through' : 'none'
        currentTask.subtasks[e.target.id].checked ? check++ : check--
        currentTask.subtasks[e.target.id].checked ? setSubtaskDone(prev => prev + 1) : setSubtaskDone(prev => prev - 1)

        console.log(currentTask.subtasks[e.target.id])

        
       
        

        checkSubtask(currentTask.subtasks)  

        
        setChecked(check)
        console.log(checked)

    }
    

    return (
        <>
            <Overlay setShowTaskWindow={setShowTaskWindow}></Overlay>
            
            <div className='add-new-from'>
                <div className='task-title task-title-box' style={{'display' : 'flex', 'justifyContent' : 'space-between', 'alignItems' : 'center', 'position' : 'relative'}}>
                    <h3 className="task-title heading-l">{currentTask.title}</h3>
                    <IconElipse setShowTaskOptionModal={setShowTaskOptionModal}></IconElipse>
                    {showTaskOptionModal && <TaskOptionModal setShowTaskWindow={setShowTaskWindow} getTasks={getTasks} currentTask={currentTask}></TaskOptionModal>}
                    </div>
                <p className="task-description body-l">{currentTask.description}</p>
               {currentTask.subtasks.length ?  <label htmlFor="subtasks" className='body-l'>Subtasks ({subtaskDone} of {currentTask.subtasks.length})</label> : null}
                <ul className="subtask-list">
                    {currentTask.subtasks && currentTask.subtasks.map((subtask, index) => {
                        return (
                            <div className="subtask-container" key={index} >
                                <input id={index} className='subtask-checkbox' type="checkbox" checked={subtask.checked}   onChange={(e) => {
                                    setCheckedSubtasks(e)  
                                    }}/>
                                <h4 id={index} style={{textDecoration: subtask.checked ? 'line-through' : 'none'}} className='subtask-title body-l'>{subtask.title}</h4>
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
                            {currentBoard.columns && currentBoard.columns.map((column,index) => {
                                col.current = column
                                return (col.current !== currentOption && <p key={index} className="option body-l" onClick={() => { changeStatus(column) }}>{column}</p>
                                     )
                            })}
                        </div>}
                    </div>


                </div>
            </div >
        </>
    )
}

export default TaskWindow