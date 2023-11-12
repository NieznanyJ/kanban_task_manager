import React from 'react';
import { useState, useEffect } from 'react';
import UpperBar from './componets/UpperBar'
import BottomBar from './componets/BottomBar';
import BoardContent from './componets/boardContent/BoardContent';
import LoginPage from './componets/loginPage/LoginPage';
import { AppContext, UserContext, ModalBoxContext } from './context/Context';
import AddNewModal from './componets/addNew/AddNewModal';
import EditBoardModal from './componets/editModal/editBoardModal';




function App() {

  const [boards, setBoards] = useState(null)
  const [currentBoard, setCurrentBoard] = useState({ id: 0, username: "", title: "No Boards", columns: [] })
  const username = "zzz"

  const getData = async () => {

    try {
      const response = await fetch(`http://localhost:8000/boards/${username}`)
      const json = await response.json()
      setBoards(json)
      boards ? setCurrentBoard(boards[boards.length-1]) : setCurrentBoard({ id: 0, username: "", title: "No Boards", columns: [] })

    } catch (error) {
      console.error(error)
    }
  }



  useEffect(() => {
    getData()

  }, [])



  useEffect(() => {
    if (boards && boards.length) { setCurrentBoard(boards[boards.length-1]) }
    else { setCurrentBoard({ id: 0, username: "", title: "No Boards", columns: [] }) }

  }, [boards, username])

  useEffect(()=>{
    console.log(currentBoard)
  },[currentBoard])

  const [logged, setLogged] = useState(true);
  const [showModalBox, setShowModalBox] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addMode, setAddMode] = useState(null);

  return (
    <div className="app" style={{ height: '100vh' }}>
      <UserContext.Provider value={[logged, setLogged, username, getData]}>
        {logged ?
          <>
            <AppContext.Provider value={[boards, setBoards, currentBoard, setCurrentBoard]}>
              <ModalBoxContext.Provider value={[showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal]}>
                <UpperBar></UpperBar>
                <BoardContent></BoardContent>
                <BottomBar></BottomBar>
                {showAddModal && <AddNewModal></AddNewModal>}
                {showEditModal && <EditBoardModal></EditBoardModal>}
              </ModalBoxContext.Provider>
            </AppContext.Provider>
          </> : <LoginPage></LoginPage>
        }
      </UserContext.Provider>
    </div>
  )
}

export default App
