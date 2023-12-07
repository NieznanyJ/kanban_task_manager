import React, { useContext, useState, useEffect } from 'react'
import IconLogoMobile from './icons/IconLogoMobile'
import IconChevronUp from './icons/IconChevronUp'
import IconChevronDown from './icons/IconChevronDown'
import IconAddTaskMobile from './icons/IconAddTaskMobile'
import IconElipse from './icons/IconElipse'
import BoardModal from './BoardModal'
import { ModalBoxContext, AppContext, themeContext } from '../context/Context'
import DeleteBoardModal from './DeleteBoardModal'
import BoardOptionModal from './BoardOptionModal'
import Overlay from './Overlay'
import EditBoardModal from './editModal/EditBoardModal'




function UpperBar() {

    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext)
    const [boards, setBoards, currentBoard] = useContext(AppContext)
    const [theme, setTheme] = useContext(themeContext)

    const [showDeleteBoardModal, setShowDeleteBoardModal] = useState(false)
    const [showBoardOptionModal, setShowBoardOptionModal] = useState(false)

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

    



    return (
        <div className={theme === 'light' ? 'light-theme upper-bar' : 'upper-bar'}>

            <div className={theme === 'light' ? 'light-theme upper-bar-title-box' : 'upper-bar-title-box'}>
                {screenWidth < 768 && <IconLogoMobile></IconLogoMobile>}
                <div className={theme === 'light' ? 'light-theme board-title-box' : 'board-title-box'} onClick={screenWidth <= 768 ? () => setShowModalBox(prev => !prev) : null}>
                    <h1 className="board-title heading-l">{currentBoard ? currentBoard.title : "No boards"}</h1>
                    {screenWidth <= 768 && (showModalBox ? <IconChevronUp></IconChevronUp> : <IconChevronDown></IconChevronDown>)}
                </div>
            </div>

            <div className={theme === 'light' ? 'light-theme add-task-box' : 'add-task-box'}>
                <button className="btn main-btn heading-m" onClick={() => {
                    setAddMode("newTask")
                    setShowAddModal(true)
                }}>
                    {screenWidth < 768 ? <IconAddTaskMobile setAddMode={setAddMode} setShowAddModal={setShowAddModal}></IconAddTaskMobile> : "+Add New Task"}
                </button>
                <IconElipse setShowBoardOptionModal={setShowBoardOptionModal}></IconElipse>
            </div>
    {
        showDeleteBoardModal && <>
            <Overlay setShowDeleteBoardModal={setShowDeleteBoardModal}></Overlay>
            <DeleteBoardModal setShowDeleteBoardModal={setShowDeleteBoardModal}></DeleteBoardModal>
        </>
    }

    { showBoardOptionModal && <BoardOptionModal setShowBoardOptionModal={setShowBoardOptionModal} setShowDeleteBoardModal={setShowDeleteBoardModal}></BoardOptionModal> }

            
        </div >
    )
}

export default UpperBar