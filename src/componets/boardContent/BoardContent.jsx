import React, { useContext, useRef } from 'react'
import { AppContext } from '../../context/Context'
import NoColumns from './NoColumns'
import Columns from './Columns'


function BoardContent() {

  const [boards, setBoards, currentBoard] = useContext(AppContext)

  const currentColumnsLength = useRef(null)

 

  currentBoard.columns.length !== 0 ? currentColumnsLength.current = currentBoard.columns.length : currentColumnsLength.current = null


  return (
    <section className="board-content">

    {currentColumnsLength.current && currentBoard.columns  ? <Columns></Columns> :   <NoColumns></NoColumns>}

  
    </section>
  )
}

export default BoardContent