import React, { useContext, useEffect, useRef, useState } from 'react'
import NewColumnInput from './NewColumnInput'
import {UserContext , ModalBoxContext, AppContext} from '../../context/Context'


function NewColumnForm() {

    const [newColumns, setNewColumns] = useState([{ id: Math.random(), title: "Todo" }, { id: Math.random(), title: "Doing" }])
    const columnTitle = useRef([])

    const [logged, setLogged, username, getData] = useContext(UserContext)
    const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext)
    const [showModalBox, setShowModalBox, setShowAddModal] = useContext(ModalBoxContext)

    console.log(currentBoard)


    //update database with new board data

    const putData = async (newBoard) => {
            
            try {
                const response = await fetch(`http://localhost:8000/boards/${username}/${currentBoard.title}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newBoard),
                })
                const json = await response.json()
                console.log(json)
                getData()
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

        console.log(JSON.stringify(newBoard.title))
        putData(newBoard) 
        setShowAddModal(false)
        
    }



    
     const handleNewColumn = (e) => {
        
            const newColumnInputs = document.querySelectorAll('.new-column-input input')

            const newColumnValues = newColumns.map((column, index) => {
                  return column.title = newColumnInputs[index].value  
               
            })

            columnTitle.current = newColumnValues
            setNewColumns(newColumnValues)      
            
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

export default NewColumnForm