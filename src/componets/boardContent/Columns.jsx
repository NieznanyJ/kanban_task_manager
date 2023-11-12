import React, { useContext, useEffect, useMemo, useState } from 'react';
import { AppContext } from '../../context/Context';

function Columns({ title }) {
    const [boards, setBoards, currentBoard] = useContext(AppContext);
    const [tasks, setTasks] = useState([]);
    const nrOfTasks = tasks ? tasks.length : 0;

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

    return (
        <div className="columns-box">
            {currentBoard.columns.map((column, index) => {
                return (
                    <div key={index} className="column">
                        <div className="column-title-box">
                            <div className="color-dot" style={{ backgroundColor: columnColors[index] }}></div>
                            <h3 className='column-title heading-s'>{column}({nrOfTasks})</h3>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Columns;
