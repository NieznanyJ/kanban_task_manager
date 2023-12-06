import React from 'react'
import { AppContext } from '../context/Context'
import { useContext } from 'react'

function NoColumns() {

    const [boards, setBoards, currentBoard] = useContext(AppContext)

  return (
    <div className="board-content-add-new-box">
            <h3 className='heading-l'>
                {currentBoard.title === "No Boards" ?   "You have no boards. Create a new board to get started." : "This board is empty. Create a new column to get started."}
            </h3>
            <button className="btn main-btn heading-m" style={{padding: "1em"}}>
                {currentBoard.title === "No Boards" ?  "+ Add New Board" : "+ Add New Column"}
            </button>
        </div>
  )
}

export default NoColumns