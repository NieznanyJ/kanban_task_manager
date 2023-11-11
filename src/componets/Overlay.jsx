import React, { useContext } from 'react'
import { ModalBoxContext } from '../context/Context'


function Overlay() {

  const [showModalBox, setShowModalBox, setShowAddModal] = useContext(ModalBoxContext)

  const closeModals = () =>{
    setShowModalBox(false)
    setShowAddModal(false)
  }

  return (
    <div className="overlay" onClick={closeModals}> </div>
  )
}

export default Overlay