import React, { useContext, useState } from 'react'
import { AppContext, UserContext, ModalBoxContext } from '../../context/Context'
import EditTaskModal from '../editModal/EditTaskModal'

function TaskOptionModal({currentTask, getTasks, setShowTaskWindow}) {


    const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext)
    const [logged, setLogged, username, getData] = useContext(UserContext)
    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext);
    const [showEditTaskModal, setShowEditTaskModal] = useState(false)

    const deleteTask = async () => {
        const response = await fetch(`http://localhost:8000/tasks/${username}/${currentBoard.title}/${currentTask.taskId}`, {
            method: 'DELETE',
        })
       
        getTasks()
        

    }

    return (
        
        <div className=" task-option-modal">
             {showEditTaskModal && <EditTaskModal setShowTaskWindow={setShowTaskWindow} setShowEditTaskModal={setShowEditTaskModal} getTasks={getTasks} currentTask={currentTask}></EditTaskModal>}
          <ul className="board-option-list">
            <li className="board-option body-l" onClick={() => {
                setShowEditTaskModal(true)
    
            }}
            >Edit task</li>
            <li className="board-option body-l" style={{ color: "var(--red)" }} onClick={() => {
                deleteTask()
                window.location.reload()
    
            }}>Delete task</li>
          </ul>
        </div>
      )
}

export default TaskOptionModal