import React from 'react'
import { AppContext, ModalBoxContext, themeContext } from '../../context/Context'
import { useContext } from 'react'

function NoColumns() {

  const [boards, setBoards, currentBoard] = useContext(AppContext)
  const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode] = useContext(ModalBoxContext);
  const [theme, setTheme] = useContext(themeContext)

  const setMode = () => {
    if (currentBoard.title === "No Boards") {
      setAddMode("newBoard")
    }
    else {
      setAddMode("newColumn")
    }

    setShowAddModal(true)
  }

  return (
    <div className={theme === 'light' ? 'light-theme board-content-add-new-box' : 'board-content-add-new-box'}>
      <h3 className='heading-l'>
        {currentBoard.title === "No Boards" ? "You have no boards. Create a new board to get started." : "This board is empty. Create a new column to get started."}
      </h3>
      <button className="btn main-btn heading-m" onClick={setMode} style={{ padding: "1em" }}>
        {currentBoard.title === "No Boards" ? "+ Add New Board" : "+ Add New Column"}
      </button>
    </div>
  )
}

export default NoColumns