import React, { useContext, useEffect } from 'react'
import Overlay from './Overlay';
import IconBoard from './icons/IconBoard';
import Board from './Board';
import ToggleSwitch from './ToggleSwitch';
import IconDarkTheme from './icons/IconDarkTheme'
import IconLightTheme from './icons/IconLightTheme'

import { AppContext, ModalBoxContext } from '../context/Context';


function BoardModal() {

    const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext);
    const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode] = useContext(ModalBoxContext);
    
    const nrOfBoards = boards ?  boards.length : 0

    return (

        <>
            <Overlay></Overlay>
            <div className="board-modal">
                <h3 className='heading-m' style={{ textTransform: 'uppercase', paddingLeft: '1em' }}>All boards ({nrOfBoards})</h3>
                <ul className="boards-list">
                    {boards ? boards.map((board) => {
                        return (
                            <Board key={board.id} id={board.id} title={board.title}></Board>
                        )
                    }) : ''}

                    
                </ul>
                <h3 className='heading-m board-text' style={{ color: 'var(--main-purple)', paddingLeft: '1rem', marginTop : '5px' }} onClick={() => {
                    setShowModalBox(false)
                    setShowAddModal(true)
                    setAddMode('newBoard')
                }}>
                        <IconBoard color={'var(--main-purple)'} ></IconBoard>
                        + Create new board
                    </h3>

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