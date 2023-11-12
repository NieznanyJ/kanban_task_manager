import React, { useContext } from 'react'
import Overlay from '../Overlay'
import NewBoardForm from './newBoardForm'
import { ModalBoxContext } from '../../context/Context'
import NewColumnForm from './NewColumnForm'

function AddNewModal() {

  const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode] = useContext(ModalBoxContext);
  return (
    <>
    <Overlay></Overlay>
    
       {addMode === "newBoard" ? <NewBoardForm></NewBoardForm> : <NewColumnForm></NewColumnForm>}
       

    </>
  )
}

export default AddNewModal