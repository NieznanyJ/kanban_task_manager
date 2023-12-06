import React, { useContext, useEffect, useRef, useState } from 'react'
import NewColumnInput from '../addNew/NewColumnInput'
import Overlay from '../Overlay'
import { UserContext, ModalBoxContext, AppContext, themeContext } from '../../context/Context'
import ErrorMsg from '../ErrorMsg'


function EditBoardModal() {
    const [logged, setLogged, username, getData] = useContext(UserContext)
    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext)
    const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext)
    const [theme, setTheme] = useContext(themeContext)

    const [newColumns, setNewColumns] = useState(null)
    const columnTitle = useRef([])
    const errors = useRef(null)

    console.log(currentBoard)

    const currentColumns = currentBoard.columns.map((column) => {
        const newColumn = {
            id: Math.random(),
            title: column,
        };

        return newColumn
    })

    useEffect(() => {
        setNewColumns(currentColumns)
    }, [])




    const [boardName, setBoardName] = useState(currentBoard.title === 'No Boards' ? '' : currentBoard.title)


    const putData = async (newBoard) => {

        try {
            const response = await fetch(`${process.env.SERVER_URL}/boards/${username}/${currentBoard.id}`, {
                method: 'PUT',
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


    const postData = async (newBoard) => {

        try {
            const response = await fetch(`${process.env.SERVER_URL}/boards/${username}`, {
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

    
    const deleteError = () =>{

        const form = document.querySelector('.add-new-from')
        const inputs = form.getElementsByTagName('input')
        const errorMsgs = document.querySelectorAll('.error-msg')

        const inputArray = [...inputs]

        inputArray.forEach((input, index) => {
            input.classList.remove('input-error')
            errorMsgs[index].classList.add('hidden')
        })
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
                
                errorMsgs[index].classList.add('hidden');
                input.classList.remove('input-error');
                hasErrors = false;
            }

        })



        errors.current = hasErrors
    }


    //function that handles new board submit

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNewColumn();
        const newBoard = {
            id: currentBoard.id,
            username: username,
            title: e.target['board-title'].value,
            columns: columnTitle.current,
        }


        if (!errors.current) {
            currentBoard.title === 'No Boards' ? postData(newBoard) : putData(newBoard)
            setShowEditModal(false)
        }

    }




    const handleNewColumn = (e) => {


        const inputs = document.getElementsByTagName('input')
        const form = document.querySelector('.edit-board-form')
        const columnInputs = form.querySelectorAll('.new-column-input input')



        handleErrors()


        if (!errors.current) {
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
        <>
            <Overlay></Overlay>
            <form action="post" onSubmit={handleSubmit} className={theme === 'light' ? 'light-theme add-new-from edit-board-form' : 'add-new-from edit-board-form'}>
                <h2 className='add-new-title heading-l'>Edit Board</h2>
                <div className="add-new-input-box">
                    <label htmlFor="board-title" className='body-l'>Board Name</label>
                    <div className="input-container">
                        <input className='board-title input' id='board-title' value={boardName} maxLength={20} name='board-title' type="text" placeholder='e.g. Web Design' onChange={(e) => {
                            if (e.target.classList.contains('input-error')) {
                                e.target.classList.remove('input-error')
                            }
                            setBoardName(e.target.value)
                            deleteError()
                        }} />
                        <ErrorMsg></ErrorMsg>
                    </div>
                </div>
                <div className="add-new-input-box">
                    <label htmlFor="board-columns" className='body-l'>Board Columns</label>
                    <div className="add-new-input-box new-column-box">
                        {newColumns && newColumns.map((column, index) => {
                            return (<NewColumnInput key={column.id} value={column.title} newColumns={newColumns} setNewColumns={setNewColumns} id={column.id}></NewColumnInput>)
                        })}
                    </div>
                </div>

                <div className="add-new-button-box">
                    <button type='button' className='btn add-new-btn secondary-btn body-m' onClick={addNewColumns}>+ Add New Column</button>
                    <button type='submit' className='btn add-new-btn main-btn body-m'>Save Changes</button>
                </div>

            </form>
        </>
    )
}

export default EditBoardModal