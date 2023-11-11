import React, { useContext } from 'react'
import IconLogoMobile from './icons/IconLogoMobile'
import IconChevronUp from './icons/IconChevronUp'
import IconChevronDown from './icons/IconChevronDown'
import IconAddTaskMobile from './icons/IconAddTaskMobile'
import IconElipse from './icons/IconElipse'
import BoardModal from './BoardModal'
import { ModalBoxContext, AppContext } from '../context/Context'



function UpperBar() {

    const [showModalBox, setShowModalBox] = useContext(ModalBoxContext)
    const [boards, setBoards, currentBoard] = useContext(AppContext)

    return (
        <div className='upper-bar'>

            <div className="upper-bar-title-box">
                <IconLogoMobile></IconLogoMobile>
                <div className="board-title-box" onClick={() => setShowModalBox(true)}>
                    <h1 className="board-title heading-l">{currentBoard ? currentBoard.title : "No boards"}</h1>
                    {showModalBox ? <IconChevronUp/> : <IconChevronDown/>}
                </div>
            </div>

            <div className="add-task-box">
                <button className="btn main-btn">
                    <IconAddTaskMobile></IconAddTaskMobile>
                </button>
                <IconElipse></IconElipse>
            </div>
            {showModalBox && <BoardModal></BoardModal>}
        </div>
    )
}

export default UpperBar