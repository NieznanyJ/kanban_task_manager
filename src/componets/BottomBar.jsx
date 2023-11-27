import React, { useContext } from 'react'
import { UserContext, AppContext, ModalBoxContext } from '../context/Context'
import HideSidebarToggle from './HideSidebarToggle';

function BottomBar() {

    const [logged, setLogged, username] = useContext(UserContext)
    const [boards, setBoards, currentBoard, setCurrentBoard, sidebarHidden, setSidebarHidden] = useContext(AppContext);
    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext);

    const signOut = (e) =>{
        console.log("signing out")
    }

  return (
    <div className="bottom-bar">
      {!sidebarHidden ? <h4 className="user-name body-l">Welcome {username}</h4> :
      <div className="sho-sidebar-box"><HideSidebarToggle  setShowModalBox={setShowModalBox}></HideSidebarToggle>
        <h4 style={{marginLeft : '65px'}} className="user-name body-l">Welcome {username}</h4>
      </div> }
        
        <button className='btn btn-red sign-out-btn body-l' onClick={signOut}>Sign out</button>
    </div>
  )
}

export default BottomBar