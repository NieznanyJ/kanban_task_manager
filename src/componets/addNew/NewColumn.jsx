import React, { useContext } from 'react'
import { ModalBoxContext } from '../../context/Context'

function NewColumn() {

    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext);
  return (
    <div className='new-column column heading-xl' onClick={() => {
        
        setShowAddModal(true);
        setAddMode("addNewColumn");
        
    }}>+New Column</div>
  )
}

export default NewColumn