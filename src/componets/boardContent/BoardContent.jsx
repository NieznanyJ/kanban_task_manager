import React, { useContext, useRef } from 'react'
import { AppContext, themeContext } from '../../context/Context'
import NoColumns from './NoColumns'
import Columns from './Columns'


function BoardContent() {

  const [boards, setBoards, currentBoard] = useContext(AppContext)
  const [theme, setTheme] = useContext(themeContext)

  const currentColumnsLength = useRef(null)

 

  currentBoard.columns.length !== 0 ? currentColumnsLength.current = currentBoard.columns.length : currentColumnsLength.current = null


  return (
    <section className={theme === 'light' ? 'light-theme board-content' : 'board-content'}>

    {currentColumnsLength.current && currentBoard.columns  ? <Columns></Columns> :   <NoColumns></NoColumns>}

  
    </section>
  )
}

export default BoardContent