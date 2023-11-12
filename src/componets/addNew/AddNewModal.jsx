import React, { useContext } from 'react'
import Overlay from '../Overlay'
import NewBoardForm from './newBoardForm'
import { ModalBoxContext } from '../../context/Context'
import NewColumnForm from './NewColumnForm'
import AddNewTaskForm from './AddNewTaskForm'

function AddNewModal() {

  const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext);
  console.log(addMode)
  
  return (
    <>
    <Overlay></Overlay>
    


       {addMode === "newBoard" && <NewBoardForm></NewBoardForm>}
       {addMode === "newColumn" && <NewColumnForm></NewColumnForm>}
       {addMode === "newTask" && <AddNewTaskForm></AddNewTaskForm>}
       
       
       

    </>
  )
}

export default AddNewModal