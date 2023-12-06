import React, { useContext, useState, useEffect } from 'react'
import { ModalBoxContext } from '../context/Context'


function Overlay({setShowDeleteBoardModal, setShowTaskWindow}) {

  const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext)
  
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    
    useEffect(() => {
        const handleResize = () => {
          setScreenWidth(window.innerWidth);
        };
    
        window.addEventListener('resize', handleResize);
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

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