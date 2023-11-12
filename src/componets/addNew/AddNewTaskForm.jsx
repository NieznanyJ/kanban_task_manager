
import React, { useContext, useEffect, useRef, useState } from 'react'
import NewSubtaskInput from './NewSubtaskInput'
import { UserContext, ModalBoxContext, AppContext } from '../../context/Context'
import IconChevronDown from '../icons/IconChevronDown'
import IconChevronUp from '../icons/IconChevronUp'


function AddNewTaskForm() {


  const [logged, setLogged, username, getData] = useContext(UserContext)
  const [showModalBox, setShowModalBox, setShowAddModal] = useContext(ModalBoxContext)
  const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext)


  const [newSubtasks, setNewSubtasks] = useState([{ id: Math.random(), title: "Make Coffe" }, { id: Math.random(), title: "Drink coffee & smile" }])
  const subtaskTitle = useRef([])

  const [currentOption, setCurrentOption] = useState(currentBoard.columns[0])
  const [statusBox, setStatusBox] = useState(false)
  


  const postData = async (newBoard) => {

    try {
      const response = await fetch(`http://localhost:8000/boards/${username}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newBoard),
      })
      const json = await response.json()

      getData()
    } catch (error) {
      console.error(error)
    }
  }

  //function that handles new board submit

  const handleSubmit = (e) => {
    e.preventDefault();
    handleNewColumn();
    const newTask = {
      username: username,
      title: e.target['board-title'].value,
      subtasks: subtaskTitle.current,
    }

    postData(newBoard)
    setShowAddModal(false)

  }






  const handleNewColumn = (e) => {

    const newSubtaskInout = document.querySelectorAll('.new-column-input input')

    const newSubtaskValue = newSubtasks.map((subtask, index) => {
      return subtask.title = newSubtaskInout[index].value

    })

    subtaskTitle.current = newColumnValues
    setNewColumns(newSubtaskValue)

  }


  const addNewSubtask = () => {
    const newSubtask = {
      id: Math.random(),
      title: "",
    };
    setNewSubtasks((prev) => [...prev, newSubtask]);
  };

  const showStatusBox = () => {



  }


  

  return (
    <form action="post" onSubmit={handleSubmit} className='add-new-from add-new-task-from'>
      <h2 className='add-new-title heading-l'>Add New Task</h2>
      <div className="add-new-input-box">
        <label htmlFor="task-title" className='body-l'>Title</label>
        <input id='task-title' name='task-title' type="text" placeholder='e.g. Take coffee break' />
      </div>
      <div className="add-new-input-box">
        <label htmlFor="task-description" className='body-l'>Description</label>
        <textarea id='task-description' name='task-description' type="text" placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little." />
      </div>
      <div className="add-new-input-box">
        <label htmlFor="board-columns" className='body-l'>Subtasks</label>
        <div className="add-new-input-box new-column-box">
          {newSubtasks && newSubtasks.map((subtask) => {
            console.log(subtask.title)
            return (<NewSubtaskInput key={subtask.id} placeholder={subtask.title} newSubtasks={newSubtasks} setNewSubtasks={setNewSubtasks} id={subtask.id}></NewSubtaskInput>)
          })}
        </div>
      </div>

      <div className="add-new-button-box">
        <button type='button' className='btn add-new-btn secondary-btn body-m' onClick={addNewSubtask}>+ Add New Subtask</button>

        <div className="add-new-input-box">
          <label htmlFor="task-status" className='body-l'>Status</label>
          <div name="task-status" id='task-status' className="selection-box" onClick={() => {setStatusBox(prev => {return !prev})}}>
          <p className="current-option body-l">{currentOption}</p>
          {statusBox ?  <IconChevronUp></IconChevronUp> : <IconChevronDown></IconChevronDown>}
          {statusBox && <div className="option-box">
            {currentBoard.columns && currentBoard.columns.map((column) => {
              return (<p key={column.id} className="option body-l" onClick={() => {setCurrentOption(column)}}>{column}</p>)
            })}
          </div>}
          </div>

          
        </div>

        <button type='submit' className='btn add-new-btn main-btn body-m'>Create New Board</button>
      </div>

    </form>
  )
}

export default AddNewTaskForm