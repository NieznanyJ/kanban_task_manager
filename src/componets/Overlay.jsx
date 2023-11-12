import React, { useContext } from 'react'
import { ModalBoxContext } from '../context/Context'


function Overlay({setShowDeleteBoardModal}) {

  const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext)

  const closeModals = () =>{
    setShowModalBox(false)
    setShowAddModal(false)
    if (setShowDeleteBoardModal){setShowDeleteBoardModal(false)}
    setShowEditModal(false)
    setShowAddTask(false)
  }

  return (
    <div className="overlay" onClick={closeModals}> </div>
  )
}

export default Overlay