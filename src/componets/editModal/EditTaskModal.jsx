import React, { useContext, useEffect, useRef, useState } from 'react'
import NewSubtaskInput from '../addNew/NewSubtaskInput'
import { UserContext, ModalBoxContext, AppContext } from '../../context/Context'
import IconChevronDown from '../icons/IconChevronDown'
import IconChevronUp from '../icons/IconChevronUp'
import ErrorMsg from '../ErrorMsg'


function EditTaskModal({currentTask, getTasks, setShowEditTaskModal, setShowTaskWindow}) {

    const [logged, setLogged, username, getData] = useContext(UserContext)
    const [showModalBox, setShowModalBox, setShowAddModal] = useContext(ModalBoxContext)
    const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext)


    const [newSubtasks, setNewSubtasks] = useState(currentTask.subtasks)
    const [taksDescription, setTaskDescription] = useState(currentTask.description)
    const subtaskTitle = useRef([])
    const errors = useRef(null)

    const [currentOption, setCurrentOption] = useState(currentTask.status)
    const [statusBox, setStatusBox] = useState(false)

    const [edditedTitle, setEdditedTitle] = useState(currentTask.title)


   

    const updateTask = async (newTask) => {

        try {

            const response = await fetch(`http://localhost:8000/tasks/edit/${username}/${currentBoard.title}/${currentTask.taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTask),
            })
            const json = await response.json()

            getTasks()
            setShowEditTaskModal(false)
            setShowTaskWindow(false)
              
        } catch (error) {
            console.error(error)
        }
    }

    //function that handles new board submit

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNewTask();

        const newTask = {
            taskId: currentTask.id,
            boardId: currentBoard.id,
            username: username,
            title: e.target['task-title'].value,
            description: e.target['task-description'].value,
            subtasks: newSubtasks,
            status: currentOption
        }

        console.log(newTask)


        if (!errors.current) {
            updateTask(newTask)
            setShowAddModal(false)
        }

    }



    const handleErrors = (e) => {
        const form = document.querySelector('.add-new-from')
        const inputs = form.getElementsByTagName('input')
        const errorMsgs = document.querySelectorAll('.error-msg')
        console.log(inputs)
        const inputArray = [...inputs]

        //if any input is empty, show error message

        let hasErrors = false;

        inputArray.forEach((input, index) => {


            if (input.value === '') {
                errorMsgs[index].classList.remove('hidden');
                input.classList.add('input-error');
                hasErrors = true;
            } else {
                if (errorMsgs[index]){
                    errorMsgs[index].classList.add('hidden');
                }
                input.classList.remove('input-error');
                hasErrors = false;
            }

        })
        errors.current = hasErrors
    }

    const deleteError = () => {

        const form = document.querySelector('.add-new-from')
        const inputs = form.getElementsByTagName('input')
        const errorMsgs = document.querySelectorAll('.error-msg')

        const inputArray = [...inputs]

        inputArray.forEach((input, index) => {
            input.addEventListener('input', (e) => {
                e.target.classList.remove('input-error')
                errorMsgs[index].classList.add('hidden')
            })

        })
    }




    const handleNewTask = (e) => {

        const newBoardForm = document.querySelector('.add-new-task-from')
        const newSubtaskInput = newBoardForm.querySelectorAll('.new-column-input input')


        handleErrors()

        if (!errors.current) {
            const newSubtaskValue = newSubtasks.map((subtask, index) => {
                return subtask.title = newSubtaskInput[index].value

            })

            subtaskTitle.current = newSubtaskValue
            setNewSubtasks(newSubtaskValue)
        }



    }


    const addNewSubtask = () => {
        const newSubtask = {
            id: Math.random(),
            title: "",
            checked: false

        };
        setNewSubtasks((prev) => [...prev, newSubtask]);
        console.log(newSubtasks)

    };


    return (
        <form action="post" onSubmit={handleSubmit} className='add-new-from add-new-task-from' style={{'zIndex' : '100' }}>
            <h2 className='add-new-title heading-l'>Add New Task</h2>
            <div className="add-new-input-box">
                <label htmlFor="task-title" className='body-l'>Title</label>
                <div className="input-container">
                    <input id='task-title' name='task-title' value={edditedTitle}  type="text" placeholder='e.g. Take coffee break' onChange={(e) => {
                        deleteError()
                        setEdditedTitle(e.target.value)
                    }} />
                    <ErrorMsg></ErrorMsg>
                </div>
            </div>
            <div className="add-new-input-box">
                <label htmlFor="task-description" className='body-l'>Description</label>
                <textarea id='task-description' value={taksDescription} name='task-description' type="text" placeholder="e.g. It's always good to take a break. This 15 minute break will  recharge the batteries a little."  onChange={(e) => {setTaskDescription(e.target.value)}}/>
            </div>
            <div className="add-new-input-box">
                <label htmlFor="board-columns" className='body-l'>Subtasks</label>
                <div className="add-new-input-box new-column-box">
                    {newSubtasks && newSubtasks.map((subtask) => {
                       
                        return (<NewSubtaskInput key={subtask.id + Math.random()} value={subtask.title} placeholder={subtask.title} newSubtasks={newSubtasks} setNewSubtasks={setNewSubtasks} id={subtask.id}></NewSubtaskInput>)
                    })}
                </div>
            </div>

            <div className="add-new-button-box">
                <button type='button' className='btn add-new-btn secondary-btn body-m' onClick={addNewSubtask}>+ Add New Subtask</button>

                <div className="add-new-input-box">
                    <label htmlFor="task-status" className='body-l'>Status</label>
                    <div name="task-status" id='task-status' className="selection-box" onClick={(e) => {
                        setStatusBox(prev => { return !prev })
                        e.target.classList.toggle('selection-box-active')
                    }}>
                        <p className="current-option body-l">{currentOption}</p>
                        {statusBox ? <IconChevronUp></IconChevronUp> : <IconChevronDown></IconChevronDown>}
                        {statusBox && <div className="option-box">
                            {currentBoard.columns && currentBoard.columns.map((column) => {
                                return (<p key={Math.random()} className="option body-l" onClick={() => { setCurrentOption(column) }}>{column}</p>)
                            })}
                        </div>}
                    </div>


                </div>

                <button type='submit' className='btn add-new-btn main-btn body-m'>Save Changes</button>
            </div>

        </form>
    )
}

export default EditTaskModal