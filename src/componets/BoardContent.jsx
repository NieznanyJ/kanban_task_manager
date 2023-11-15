import React, { useContext, useRef } from 'react'
import { AppContext } from '../../context/Context'
import NoColumns from './NoColumns'
import Columns from './Columns'


function BoardContent() {

  const [boards, setBoards, currentBoard] = useContext(AppContext)

  const currentColumnsLength = useRef(null)

  if (currentBoard.columns.length){
     currentColumnsLength.current = currentBoard.columns.length
  }

  return (
    <section className="board-content">

    {currentColumnsLength.current && currentBoard.columns  ? <Columns></Columns> :   <NoColumns></NoColumns>}

        {/* <div className="board-content-add-new-box">
            <h3 className='heading-l'>
                {currentBoard ? "This board is empty. Create a new column to get started." : "You have no boards. Create a new board to get started."}
            </h3>
            <button className="btn main-btn heading-m" style={{padding: "1em"}}>
                {currentBoard ? "+ Add New Column" : "+ Add New Board"}
            </button>
        </div> */}
    </section>
  )
}

export default BoardContent