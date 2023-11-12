import React, { useContext, useEffect, useRef, useState } from 'react'
import NewColumnInput from './NewColumnInput'
import {UserContext , ModalBoxContext} from '../../context/Context'


function NewBoardForm() {

    const [newColumns, setNewColumns] = useState([{ id: Math.random(), title: "Todo" }, { id: Math.random(), title: "Doing" }])
    const columnTitle = useRef([])

    const [logged, setLogged, username, getData] = useContext(UserContext)
    const [showModalBox, setShowModalBox, setShowAddModal] = useContext(ModalBoxContext)


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

    //function that handles new board submit

    const handleSubmit = (e) => {
        e.preventDefault();
        handleNewColumn();
         const newBoard = {
            username: username,
            title: e.target['board-title'].value,
            columns: columnTitle.current,
        } 

        postData(newBoard) 
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
            <h2 className='add-new-title heading-l'>Add New Board</h2>
            <div className="add-new-input-box">
                <label htmlFor="board-title" className='body-l'>Board Name</label>
                <input id='board-title' name='board-title' type="text" placeholder='e.g. Web Design' />
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