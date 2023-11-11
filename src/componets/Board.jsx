import React, { useContext, useEffect, useRef, useState } from 'react'
import IconBoard from './icons/IconBoard'
import { AppContext } from '../context/Context';

function Board({ id, title }) {

  const [boards, setBoards, currentBoard, setCurrentBoard] = useContext(AppContext);


  const selectBoard = (title) => {
    const boardItems = document.querySelectorAll(".board-item");
    
    boardItems.forEach((board) => {
      if (board.innerText === title ) {
        console.log(33)
         board.classList.add("selected-board-item");
        
  
        const selectedBoard = boards.filter((board) => board.title === title);
        console.log(selectedBoard)
  
        setCurrentBoard(selectedBoard.length > 0 ? selectedBoard[0] : null);
        console.log(selectedBoard); 
      } else {
        board.classList.remove("selected-board-item");
      }
    });
  };


  useEffect(()=>{
    if (currentBoard){
      selectBoard(currentBoard.title)
    }
  },[])

  return (
    <li 
    className="board-item" key={id} onClick={() => selectBoard(title)}>
        <h3 className="heading-m board-text">
        <IconBoard color={"#828FA3"}></IconBoard>
        {title}
        </h3>
    </li>
  )
}

export default Board