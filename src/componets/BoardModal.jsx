import React, { useContext, useEffect } from 'react'
import Overlay from './Overlay';
import IconBoard from './icons/IconBoard';
import Board from './Board';
import ToggleSwitch from './ToggleSwitch';
import IconDarkTheme from './icons/IconDarkTheme'
import IconLightTheme from './icons/IconLightTheme'

import { AppContext, ModalBoxContext } from '../context/Context';
import IconLogoDark from './icons/IconLogoDark';
import IconLogoLight from './icons/IconLogoLight';



function BoardModal() {

    const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext);
    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask] = useContext(ModalBoxContext);
    const screenWidth = window.innerWidth;


    const nrOfBoards = boards ? boards.length : 0

    return (

        <>
            {screenWidth <= 768 && <Overlay ></Overlay>}
            <div className="board-modal">
                {screenWidth >= 768 && <IconLogoLight></IconLogoLight>}
                <div className='boards-container'>
                    <h3 className='heading-m' style={{ textTransform: 'uppercase', paddingLeft: '1em' }}>All boards ({nrOfBoards})</h3>
                    <ul className="boards-list">
                        {boards ? boards.map((board) => {
                            return (
                                <Board key={board.id} id={board.id} title={board.title}></Board>
                            )
                        }) : ''}


                    </ul>
                    <h3 className='heading-m board-text create-board-text' style={{ color: 'var(--main-purple)', paddingLeft: '1rem', marginTop: '5px' }} onClick={() => {
                        {screenWidth < 768 && setShowModalBox(false)}
                        setShowAddModal(true)
                        setAddMode('newBoard')
                    }}>
                        <IconBoard color={'var(--main-purple)'} ></IconBoard>
                        + Create new board
                    </h3>
                    </div>

                <div className="theme-box">
                    <IconLightTheme></IconLightTheme>
                    <ToggleSwitch></ToggleSwitch>
                    <IconDarkTheme></IconDarkTheme>
                </div>
            </div>
        </>




    )
}

export default BoardModal