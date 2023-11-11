import React, { useState } from 'react'
import NewColumnInput from './NewColumnInput'


function NewBoardForm() {

    const [newColumns, setNewColumns] = useState([{id: Math.random(), name:"Todo"},{id: Math.random(), name:"Doing"}])

    const addNewColumns = () => {
        const newColumn = {
            id: Math.random(), 
            name: "",
        };
        setNewColumns((prev) => [...prev, newColumn]);
      };

  return (
    <form action="/" className='add-new-from add-new-board-from'>
        <h2 className='add-new-title heading-l'>Add New Board</h2>
        <div className="add-new-input-box">
            <label htmlFor="board-title" className='body-l'>Board Name</label>
            <input id='board-title' name='board-title' type="text" placeholder='e.g. Web Design'/>
        </div>
        <div className="add-new-input-box">
            <label htmlFor="board-columns" className='body-l'>Board Columns</label>
            <div className="add-new-input-box new-column-box">
            {newColumns && newColumns.map((column) =>{
                return(<NewColumnInput key={column.id}  value={column.name} newColumns={newColumns}  setNewColumns={setNewColumns} id={column.id}></NewColumnInput>)
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