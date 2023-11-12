import React, { useContext, useState } from 'react'
import IconLogoMobile from './icons/IconLogoMobile'
import IconChevronUp from './icons/IconChevronUp'
import IconChevronDown from './icons/IconChevronDown'
import IconAddTaskMobile from './icons/IconAddTaskMobile'
import IconElipse from './icons/IconElipse'
import BoardModal from './BoardModal'
import { ModalBoxContext, AppContext } from '../context/Context'
import DeleteBoardModal from './DeleteBoardModal'
import BoardOptionModal from './BoardOptionModal'
import Overlay from './Overlay'
import EditBoardModal from './editModal/editBoardModal'




function UpperBar() {

    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext)
    const [boards, setBoards, currentBoard] = useContext(AppContext)

    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false)
    const [showBoardOptionModal, setShowBoardOptionModal] = useState(false)

    

    return (
        <div className='upper-bar'>

            <div className="upper-bar-title-box">
                <IconLogoMobile></IconLogoMobile>
                <div className="board-title-box" onClick={() => setShowModalBox(true)}>
                    <h1 className="board-title heading-l">{currentBoard ? currentBoard.title : "No boards"}</h1>
                    {showModalBox ? <IconChevronUp /> : <IconChevronDown />}
                </div>
            </div>

            <div className="add-task-box">
                <button className="btn main-btn">
                    <IconAddTaskMobile setAddMode={setAddMode} setShowAddModal={setShowAddModal}></IconAddTaskMobile>
                </button>
                <IconElipse setShowBoardOptionModal={setShowBoardOptionModal}></IconElipse>
            </div>
            {showModalBox && <BoardModal></BoardModal>}
            {showDeleteBoardModal && <>
            <Overlay setShowDeleteBoardModal={setShowDeleteBoardModal}></Overlay>
                <DeleteBoardModal setShowDeleteBoardModal={setShowDeleteBoardModal}></DeleteBoardModal>
            </>
            }

            {showBoardOptionModal && <BoardOptionModal setShowBoardOptionModal={setShowBoardOptionModal} setShowDeleteBoardModal={setShowDeleteBoardModal}></BoardOptionModal>}

            
        </div>
    )
}

export default UpperBar