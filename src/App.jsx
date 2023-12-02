import React from 'react';
import { useState, useEffect } from 'react';
import UpperBar from './componets/UpperBar'
import BottomBar from './componets/BottomBar';
import BoardContent from './componets/boardContent/BoardContent';
import LoginPage from './componets/loginPage/LoginPage';
import { AppContext, UserContext, ModalBoxContext, themeContext } from './context/Context';
import AddNewModal from './componets/addNew/AddNewModal';
import EditBoardModal from './componets/editModal/EditBoardModal';
import AddNewTaskForm from './componets/addNew/AddNewTaskForm';
import BoardModal from './componets/BoardModal';




function App() {


  const [theme, setTheme] = useState('light')
  const [boards, setBoards] = useState(null)
  const [currentBoard, setCurrentBoard] = useState({ id: 0, username: "", title: "No Boards", columns: [] })
  const username = "ziomek"


  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getData = async () => {

    try {
      const response = await fetch(`http://localhost:8000/boards/${username}`)
      const json = await response.json()
      setBoards(json)

    } catch (error) {
      console.error(error)
    }
  }

  const handleErrors = (e) => {
    const inputs = document.getElementsByTagName('input')
    const errorMsgs = document.querySelectorAll('.error-msg')
    console.log(inputs)

    //if any input is empty, show error message

    let hasErrors = false;

    [...inputs].forEach((input, index) => {
      if (input.value === '') {
        errorMsgs[index].classList.remove('hidden');
        input.classList.add('input-error');
        hasErrors = true;
      } else {
        errorMsgs[index].classList.add('hidden');
      }
    });

    [...inputs].forEach((input, index) => {
      input.addEventListener('input', (e) => {
        errorMsgs[index].classList.add('hidden');
      })
    })

    errors.current = hasErrors
  }


  useEffect(() => {
    getData()

  }, [])



  useEffect(() => {
    if (boards && boards.length) { setCurrentBoard(boards[0]) }
    else { setCurrentBoard({ id: 0, username: "", title: "No Boards", columns: [] }) }

  }, [boards, username])

  useEffect(() => {
    console.log(currentBoard)
  }, [currentBoard])

  const [logged, setLogged] = useState(true);
  const [showModalBox, setShowModalBox] = useState(screenWidth < 768 ? false : true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddTask, setShowAddTask] = useState(true);
  const [addMode, setAddMode] = useState(null);
  const [sidebarHidden, setSidebarHidden] = useState(false)


  useEffect(() => {
    screenWidth > 768 ? setShowModalBox(true) : setShowModalBox(false)
  }, [screenWidth])

  return (
    <div className="app" style={{ height: '100vh' }}>
      <themeContext.Provider value={[theme, setTheme]}>
        <UserContext.Provider value={[logged, setLogged, username, getData]}>
          {logged ?
            <>
              <AppContext.Provider value={[boards, setBoards, currentBoard, setCurrentBoard, sidebarHidden, setSidebarHidden]}>
                <ModalBoxContext.Provider value={[showModalBox, setShowModalBox, setShowAddModal, addMode, setAddMode, showEditModal, setShowEditModal, showAddTask, setShowAddTask]}>
                  {showModalBox && <BoardModal></BoardModal>}
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
      </themeContext.Provider>


    </div>
  )
}

export default App
