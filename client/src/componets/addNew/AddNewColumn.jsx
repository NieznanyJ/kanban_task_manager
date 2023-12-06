import React, { useContext, useEffect, useRef, useState } from 'react'
import NewColumnInput from './NewColumnInput'
import { UserContext, ModalBoxContext, AppContext, themeContext } from '../../context/Context'


function AddNewColumn() {

    const [newColumns, setNewColumns] = useState(null)
    const columnTitle = useRef([])

    const [logged, setLogged, username, getData] = useContext(UserContext)
    const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext)
    const [showModalBox, setShowModalBox, setShowAddModal] = useContext(ModalBoxContext)
    const [theme, setTheme] = useContext(themeContext)

    const errors = useRef(null)



    useEffect(() => {
        const currrentColumns = currentBoard.columns.map(column => {
            const newColumn = {
                id: Math.random(),
                title: column
            }
    
            return newColumn
        })
    
        setNewColumns(currrentColumns)
    },[])



    //update database with new board data

    const putData = async (newBoard) => {

        try {
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/boards/${username}/${currentBoard.id}`, {
                method: 'PUT',
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


    //function that handles new board submit

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNewColumn();
        const newBoard = {
            username: username,
            title: currentBoard.title,
            columns: columnTitle.current,
        }


        if (!errors.current) {
            putData(newBoard)
            setShowAddModal(false)
        }

    }

    const handleErrors = (e) => {
        const form = document.querySelector('.add-new-from')
        const inputs = form.getElementsByTagName('input')
        const errorMsgs = document.querySelectorAll('.error-msg')
        console.log(errorMsgs.length)
        console.log(inputs)

        //if any input is empty, show error message

        let hasErrors = false;

        const inputArray = [...inputs]

        inputArray.forEach((input, index) => {
            if (input.value === '') {
                errorMsgs[index].classList.remove('hidden')
                input.classList.add('input-error')
                hasErrors = true;
            } else {
                errorMsgs[index].classList.add('hidden')
            }
        })

        errors.current = hasErrors
    }




    const handleNewColumn = (e) => {

        const newColumnInputs = document.querySelectorAll('.new-column-input input')



        handleErrors()

        if (!errors.current) {
            const newColumnValues = newColumns.map((column, index) => {
                return column.title = newColumnInputs[index].value

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
        console.log(newColumns)
        setNewColumns((prev) => [...prev, newColumn]); 
    };


    return (
        <form action="post" onSubmit={handleSubmit} className={theme === 'light' ? 'light-theme add-new-from add-new-board-from' : 'add-new-from add-new-board-from'}>
            <h2 className='add-new-title heading-l'>Add New Column</h2>

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
                <button type='submit' className='btn add-new-btn main-btn body-m'>Add Columns</button>
            </div>

        </form>
    )
}

export default AddNewColumn