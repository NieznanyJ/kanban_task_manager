import React, { useContext } from 'react'
import { ModalBoxContext, themeContext } from '../context/Context'

function BoardOptionModal({ setShowDeleteBoardModal, setShowBoardOptionModal }) {

  const [showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal] = useContext(ModalBoxContext)
  const [theme, setTheme] = useContext(themeContext)

  return (
    <div className={theme === 'light' ? 'light-theme board-option-modal' : 'board-option-modal'}>
      <ul className="board-option-list">
        <li className="board-option body-l" onClick={() => {
          setShowEditModal(true)
          setShowBoardOptionModal(false)

        }}
        >Edit board</li>
        <li className="board-option body-l" style={{ color: "var(--red)" }} onClick={() => {
          setShowDeleteBoardModal(true)
          setShowBoardOptionModal(false)

        }}>Delete board</li>
      </ul>
    </div>
  )
}

export default BoardOptionModal