import React, { useContext } from 'react'
import { ModalBoxContext } from '../context/Context'


function Overlay({setShowDeleteBoardModal, setShowTaskWindow}) {

  const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext)
  const screenWidth = window.innerWidth;

  const closeModals = () =>{
    {screenWidth < 768 && setShowModalBox(false)}
    setShowAddModal(false)
    if (setShowDeleteBoardModal){setShowDeleteBoardModal(false)}
    setShowEditModal(false)
    setShowAddTask(false)
    setShowTaskWindow(false)
  }

  return (
    <div className="overlay" onClick={closeModals}> </div>
  )
}

export default Overlay