import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import NewColumnInput from './NewColumnInput'
import { UserContext, ModalBoxContext } from '../../context/Context'
import ErrorMsg from '../ErrorMsg'

function NewBoardForm() {


    const [logged, setLogged, username, getData] = useContext(UserContext)
    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext)

    const [newColumns, setNewColumns] = useState([{ id: Math.random(), title: "Todo" }, { id: Math.random(), title: "Doing" }])
    const columnTitle = useRef([])
    const errors = useRef(null)


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
            window.location.reload()
        } catch (error) {
            console.error(error)
        }
    }


    const handleErrors = (e) => {
        const form = document.querySelector('.add-new-from')
        const inputs = form.getElementsByTagName('input')
        const errorMsgs = document.querySelectorAll('.error-msg')
        console.log(inputs)
    
        //if any input is empty, show error message
    
        let hasErrors = false;
    
        [...inputs].forEach((input, index) => {
            if (input.value === '') {
                errorMsgs[index].classList.remove('hidden');
                input.classList.add('input-error');
                hasErrors = true;
            } else {
                errorMsgs[index].classList.add('hidden');
            }
        })

        errors.current = hasErrors
    }

    const deleteError = () =>{

        const inputs = document.getElementsByTagName('input')
        const errorMsgs = document.querySelectorAll('.error-msg')

        const inputArray = [...inputs]

        inputArray.forEach((input, index) => {
            input.classList.remove('input-error')
            errorMsgs[index].classList.add('hidden')
        })
    }

    //function that handles new board submit

    const handleSubmit = (e) => {
        e.preventDefault()
        handleNewColumn()

        //check for errors

        console.log(errors)

        if (!errors.current) {
            const newBoard = {
                username: username,
                title: e.target['board-title'].value,
                columns: columnTitle.current,
            }

            postData(newBoard)
            setShowAddModal(false)
        }

    }

    


    const handleNewColumn = (e) => {

        const newBoardForm = document.querySelector('.add-new-board-from')
        const columnInputs = newBoardForm.querySelectorAll('.new-column-input input')


        //check for errors



        console.log(columnInputs)

        //check for errors

        handleErrors()

        if (!errors.current) {

            //set column titles

            const newColumnValues = newColumns.map((column, index) => {
                return column.title = columnInputs[index].value
            })

            columnTitle.current = newColumnValues
            setNewColumns(newColumnValues)
        }

    }


    const addNewColumns = () => {
        const newColumn = {
            id: Math.random(),
            title: "",
        };
        setNewColumns((prev) => [...prev, newColumn]);
    };


    return (
        <form action="post" onSubmit={handleSubmit} className='add-new-from add-new-board-from'>
            <h2 className='add-new-title heading-l'>Add New Board</h2>
            <div className="add-new-input-box ">
                <label htmlFor="board-title" className='body-l'>Board Name</label>
                <div className="input-container">
                    <input className='board-title input' id='board-title' maxLength={20} name='board-title' type="text" placeholder='e.g. Web Design' onChange={(e) => {
                        if (e.target.classList.contains('input-error')) {
                            e.target.classList.remove('input-error')
                        }
                        deleteError()
                    }} />
                    <ErrorMsg></ErrorMsg>
                </div>
            </div>
            <div className="add-new-input-box">
                <label htmlFor="board-columns" className='body-l'>Board Columns</label>
                <div className="add-new-input-box new-column-box">
                    {newColumns && newColumns.map((column) => {
                        return (<NewColumnInput key={column.id} value={column.title} newColumns={newColumns} setNewColumns={setNewColumns} id={column.id}></NewColumnInput>)
                    })}
                </div>
            </div>

            <div className="add-new-button-box">
                <button type='button' className='btn add-new-btn secondary-btn body-m' onClick={addNewColumns}>+ Add New Column</button>
                <button type='submit' className='btn add-new-btn main-btn body-m'>Create New Board</button>
            </div>

        </form>
    )
}

export default NewBoardForm