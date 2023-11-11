import React from 'react'
import Overlay from '../Overlay'
import NewBoardForm from './newBoardForm'

function AddNewModal() {
  return (
    <>
    <Overlay></Overlay>
    
        <NewBoardForm></NewBoardForm>

    </>
  )
}

export default AddNewModal