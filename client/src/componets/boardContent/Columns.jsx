import React, { Children, useContext, useEffect, useMemo, useState } from 'react';
import { AppContext, UserContext, themeContext } from '../../context/Context';
import NewColumn from '../addNew/NewColumn';
import Task from './Task';
import TaskWindow from './TaskWindow';

function Columns({ title }) {
    const [boards, setBoards, currentBoard] = useContext(AppContext);
    const [logged, setLogged, username, getData] = useContext(UserContext);
    const [theme, setTheme] = useContext(themeContext);

    const [nrOfTasks, setNrOfTasks] = useState([]);

    const [tasks, setTasks] = useState([])
    const [showTaskWindow, setShowTaskWindow] = useState(false);
    
    const [count, setCount] = useState(0);

    const task1 = [{ col_name: "Todo", title: "vscs" }, { col_name: "Todo", title: "vscs" }, { col_name: "Doing", title: "ascsac" }]



    const getTasks = async () => {

        try {
            const response = await fetch(`${process.env.SERVER_URL}/tasks/${username}/${currentBoard.title}`)
            const json = await response.json()
            const tasks = json.map(task => ({
                ...task,
                subtasks: task.subtasks.map(subtask => JSON.parse(subtask))
            }));


            
            setTasks(tasks)
           


        } catch (error) {
            console.error(error)
        }
    }


    




    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
        '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39',
        '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

    const [columnColors, setColumnColors] = useState([]);

    useEffect(() => {
        getTasks()
        // Generate random colors for each column
        const newColors = currentBoard.columns.map(() => {
            return colors[Math.floor(Math.random() * colors.length)];
        });
        setColumnColors(newColors);
    }, [currentBoard.columns]);



/*     useEffect(() => {
        console.log(currentTask)
    }, [currentTask])


    //drag and drop */




    const dragStart = (e) => {
        e.target.classList.add('dragging')
    }

    const dragEnd = (e, columnName) => {
        e.target.classList.remove('dragging')
    }

    const dragOver = (e, columnName) => {
        e.preventDefault();

        const afterElement = getDragAfterElement(e.target, e.clientY);
        const draggable = document.querySelector('.dragging');

        if (!e.target.contains(draggable)) {
            if (afterElement === null) {
                e.target.appendChild(draggable);
            } else {
                e.target.insertBefore(draggable, afterElement);
            }

        }
    };




    const getDragAfterElement = (container, y) => {
        const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect()
            const offset = y - box.top - box.height / 2
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child }
            } else {
                return closest
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element
    }







    return (
        <div className={theme === 'light' ? 'light-theme columns-box' : 'columns-box'}>
            {currentBoard.columns.map((column, index) => {


                const nrOfTasks = tasks.filter(task => task.status === column).length;

                return (
                    <div key={index} className="column">
                        <div className="column-title-box" >
                            <div className="color-dot" style={{ backgroundColor: columnColors[index] }}></div>
                            <h3 className='column-title heading-s'>{column}({nrOfTasks})</h3>
                        </div>
                        <div className="tasks-box" onDragOver={(e) => { dragOver(e, column) }}>
                            {tasks.map((task, index) => {
                                if (task.status === column && task.board === currentBoard.title) {
                                    return (<Task
                                        getTasks={getTasks}
                                        showTaskWindow={showTaskWindow}
                                        setShowTaskWindow={setShowTaskWindow}
                                        taskId={task.taskid}
                                        boardId={task.boardid}
                                        key={index}
                                        title={task.title}
                                        description={task.description}
                                        subtasks={task.subtasks}
                                        status={task.status}
                                        dragStart={dragStart}
                                        dragEnd={(e) => { dragEnd(e, column) }}
                                    ></Task>)
                                }
                            })}
                        </div>
                    </div>
                );

            })}
            <NewColumn></NewColumn>
        </div>
    );
}

export default Columns;
