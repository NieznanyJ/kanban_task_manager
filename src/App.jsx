import React from 'react';
import { useState, useEffect } from 'react';
import UpperBar from './componets/UpperBar'
import BottomBar from './componets/BottomBar';
import BoardContent from './componets/BoardContent'
import LoginPage from './componets/loginPage/LoginPage';
import { AppContext, UserContext, ModalBoxContext } from './context/Context';
import AddNewModal from './componets/addNew/AddNewModal';




function App() {

  const [boards, setBoards] = useState(null)
  const [currentBoard, setCurrentBoard] = useState({id:0, username: "", title: "No Boards", columns: []})
  const username = "kacap"

  const getData = async () => {

    try {
      const response = await fetch(`http://localhost:8000/boards/${username}`)
      const json = await response.json()
      setBoards(json) 
      boards ? setCurrentBoard(newBoards[0]) : setCurrentBoard({id:0, username: "", title: "No Boards", columns: []})
      
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => { 
    getData()

   }, [])



   useEffect(()=>{
    if(boards && boards.length){setCurrentBoard(boards[0])}

   },[boards])

  const [logged, setLogged] = useState(true);
  const [showModalBox, setShowModalBox] = useState(false);
  const [showAddModal, setShowAddModal] = useState(true);


  return (
    <div className="app" style={{ height: '100vh' }}>
      <UserContext.Provider value={[logged, setLogged, username]}>
        {logged ?
          <>
            <AppContext.Provider value={[boards, setBoards, currentBoard, setCurrentBoard]}>
              <ModalBoxContext.Provider value={[showModalBox, setShowModalBox, setShowAddModal]}>
                <UpperBar></UpperBar>
                <BoardContent></BoardContent>
                <BottomBar></BottomBar>
            {showAddModal &&   <AddNewModal></AddNewModal>}
              </ModalBoxContext.Provider>
            </AppContext.Provider>
          </> : <LoginPage></LoginPage>
        }
      </UserContext.Provider>
    </div>
  )
}

export default App
