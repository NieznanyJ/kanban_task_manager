import React, { useContext } from 'react'
import {AppContext, UserContext, themeContext} from '../context/Context'


function DeleteBoardModal({setShowDeleteBoardModal}) {
    

    const [boards, setBoards, currentBoard] = useContext(AppContext)
    const [logged, setLogged, username, getData] = useContext(UserContext)
    const [theme, setTheme] = useContext(themeContext)
    //delete a database 

    const deleteBoard = async () => {
        const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/boards/${username}/${currentBoard.id}`, {
            method: 'DELETE',
        }) 
        if (response.status === 200) {
            getData();
              
        }
    }

    
  return (
    <div className={theme === 'light' ? 'light-theme delete-board-modal' : 'delete-board-modal'}>
        <h3 className='delete-board-title heading-l'>Delete this board ?</h3>
        <p className='delete-board-text body-l'>Are you sure you want to delete the '{currentBoard.title}' board? This action will remove all columns and tasks and cannot be reversed.</p>
        <div className="delete-board-modal-button-box">
            <button type='button' className='btn btn-red body-l' onClick={() => {
                deleteBoard()
                setShowDeleteBoardModal(false)
                window.location.reload();   
                
            }}>Delete</button>
            <button type='button' className='btn secondary-btn body-l' onClick={() => {setShowDeleteBoardModal(false)}}>Cancel</button>
        </div>
    </div>
  )
}

export default DeleteBoardModal