import React, { useContext, useEffect, useRef, useState } from 'react'
import Overlay from '../Overlay'
import { AppContext, ModalBoxContext, themeContext } from '../../context/Context'
import IconChevronDown from '../icons/IconChevronDown';
import IconChevronUp from '../icons/IconChevronUp';
import IconElipse from '../icons/IconElipse';
import TaskOptionModal from './TaskOptionModal';



function TaskWindow({ currentTask, setShowTaskWindow, getTasks, checked, setChecked, subtaskDone, setSubtaskDone }) {

    const [boards, setBoards, currentBoard] = useContext(AppContext);
    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext)
    const [theme, setTheme] = useContext(themeContext)

    const curr = useRef(currentTask.status)
    const col = useRef(null)
    const [currentOption, setCurrentOption] = useState(currentTask.status)
    const [statusBox, setStatusBox] = useState(false)
    
    const [showTaskOptionModal, setShowTaskOptionModal] = useState(false)
    


    const checkSubtask =  async (checkedTasks) =>{

        try{
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/${currentTask.username}/${currentBoard.title}/${currentTask.taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(checkedTasks),
            })
            const json = await response.json()
            
            getTasks()

        }catch(error){
            console.error(error)
        }
    }

    


    
    
    const putStatus = async (newStatus) => {
            
            try{
                const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/tasks/${currentTask.username}/${currentBoard.title}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newStatus),
                })
                const json = await response.json()
                
                getTasks()

            }catch(error){
                console.error(error)
            }
    }

    const changeStatus = (column) => {
        
        curr.current = column

  
        const newStatus = {
            taskId: currentTask.taskId,
            boardId: currentTask.boardId,
            status: curr.current,
            subtasks: currentTask.subtasks
        }

        setCurrentOption(curr.current)
        putStatus(newStatus)
        
        
    }


    const setCheckedSubtasks = (e) => {

        const taskWindow = document.getElementById('task-window')
        
        const subtasks  = document.querySelectorAll('.subtask-title')
        const checkboxes = taskWindow.querySelectorAll('.subtask-checkbox')

      

        let check = checked
     

        e.target.checked = !e.target.checked

        e.target.checked = e.target.checked ? false : true
        currentTask.subtasks[e.target.id].checked = e.target.checked ? true : false
        currentTask.subtasks[e.target.id].checked ? setSubtaskDone(prev => prev + 1) : setSubtaskDone(prev => prev - 1)

        const newSubtasks = currentTask.subtasks.map(subtask => {return subtask})



     
       
        checkSubtask(newSubtasks) 

    }
    

    return (
        <>
            <Overlay setShowTaskWindow={setShowTaskWindow}></Overlay>
            
            <div className={theme === 'light' ? 'light-theme add-new-from' : 'add-new-from'} id='task-window'>
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
                            <div className={theme === 'light' ? 'light-theme subtask-container' : 'subtask-container'} key={index} >
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
                    <div name="task-status" id='task-status' className={theme === 'light' ? 'light-theme selection-box' : 'selection-box'} onClick={(e) => { 
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