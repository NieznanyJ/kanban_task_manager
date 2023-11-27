import React, { useContext, useEffect, useRef, useState } from 'react'
import IconBoard from './icons/IconBoard'
import { AppContext, ModalBoxContext } from '../context/Context';

function Board({ id, title }) {

  const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext);
  const [showModalBox, setShowModalBox, setShowAddModal] = useContext(ModalBoxContext);

  
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

  const selectBoard = (title) => {
    const boardItems = document.querySelectorAll(".board-item");
    
    boardItems.forEach((board) => {
      if (board.innerText === title ) {
         board.classList.add("selected-board-item");
        
        const selectedBoard = boards.filter((board) => board.title === title);
        setCurrentBoard(selectedBoard.length > 0 ? selectedBoard[0] : null);
      } else {
        board.classList.remove("selected-board-item");
      }
    });
    
  };


  useEffect(()=>{
    if (currentBoard){
      selectBoard(currentBoard.title)
    }
  },[currentBoard])


  return (
    <li 
    className="board-item" key={id} onClick={() => {
      selectBoard(title)
      (screenWidth < 768 && setShowModalBox(false))
    }}>
        <h3 className="heading-m board-text">
        <IconBoard color={"#828FA3"}></IconBoard>
        {title}
        </h3>
    </li>
  )
}

export default Board