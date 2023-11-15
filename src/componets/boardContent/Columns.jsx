import React, { Children, useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../context/Context';
import NewColumn from '../addNew/NewColumn';

function Columns({ title }) {
    const [boards, setBoards, currentBoard] = useContext(AppContext);
    const [nrOfTasks, setNrOfTasks] = useState([]);

    const task1 = [{ col_name: "Todo", title: "vscs" }, { col_name: "Todo", title: "vscs" }, { col_name: "Doing", title: "ascsac" }]




    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
        '#03a9f4', '#00bcd4', '#009688', '#4caf50', '#8bc34a', '#cddc39',
        '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b'];

    const [columnColors, setColumnColors] = useState([]);

    useEffect(() => {
        // Generate random colors for each column
        const newColors = currentBoard.columns.map(() => {
            return colors[Math.floor(Math.random() * colors.length)];
        });
        setColumnColors(newColors);
    }, [currentBoard.columns]);





    //drag and drop

    const draggable = document.querySelectorAll('.draggable')
    const containers = document.querySelectorAll('.tasks-box')




    const dragStart = (e) => {
        e.target.classList.add('dragging')
    }

    const dragEnd = (e) => {
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

            draggable.col_name = columnName;
            console.log(draggable.col_name)


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



    const YourComponent = ({ column, Children }) => {
        const childrenCount = React.Children.count(Children);}


        return (
            <div className="columns-box">
                {currentBoard.columns.map((column, index) => {
                    const childrenCount = task1.filter(task => task.col_name === column).length;
    
                    return (
                        <div key={index} className="column">
                            <div className="column-title-box">
                                <div className="color-dot" style={{ backgroundColor: columnColors[index] }}></div>
                                <h3 className='column-title heading-s'>{column}({childrenCount})</h3>
                            </div>
                            <div className="tasks-box" onDragOver={(e) => { dragOver(e, column) }}>
                                {task1.map((task, index) => {
                                    if (task.col_name === column) {
                                        return (
                                            <div key={index} onTouchStart={dragStart} onTouchEnd={dragEnd} onDragStart={dragStart} onDragEnd={dragEnd} draggable="true" className="task draggable">
                                                <p className="task-title">{task.title}</p>
                                            </div>
                                        );
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
