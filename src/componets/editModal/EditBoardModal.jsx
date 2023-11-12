import React, { useContext, useEffect, useRef, useState } from 'react'
import NewColumnInput from '../addNew/NewColumnInput'
import Overlay from '../Overlay'
import {UserContext , ModalBoxContext, AppContext} from '../../context/Context'


function EditBoardModal() {
    const [logged, setLogged, username, getData] = useContext(UserContext)
    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal] = useContext(ModalBoxContext)
    const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext)

    const [newColumns, setNewColumns] = useState(null)

    const currentColumns = currentBoard.columns.map((column) => {
        const newColumn = {
            id: Math.random(),
            title: column,
        };

        return newColumn
    })

    useEffect(()=>{
        setNewColumns(currentColumns)
    },[])

    const columnTitle = useRef([])

    

    const [boardName, setBoardName] = useState(currentBoard.title)


    const putData = async (newBoard) => {

        try {
            const response = await fetch(`http://localhost:8000/boards/${username}/${currentBoard.id}`, {
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

        
        putData(newBoard) 
        setShowEditModal(false) 
        
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
        <>
        <Overlay></Overlay>
        <form action="post" onSubmit={handleSubmit} className='add-new-from add-new-board-from'>
            <h2 className='add-new-title heading-l'>Add New Board</h2>
            <div className="add-new-input-box">
                <label htmlFor="board-title" className='body-l'>Board Name</label>
                <input id='board-title' value={boardName} name='board-title' type="text" placeholder='e.g. Web Design' onChange={(e) => {setBoardName(e.target.value)} }/>
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