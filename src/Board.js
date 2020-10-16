import React from 'react'
import Square from './Square'

const renderSquare = (i, squares, winSquares, onClick) => {
    const squareClass = winSquares && Array.from(winSquares).includes(i) ?
        `square-highlight` :
        `square`;
    return (
        <Square
            key={i}
            className={squareClass}
            value={squares[i]}
            onClick={() => onClick(i)}
        />
    );
}

const Board = ({ size, squares, winSquares, onClick }) => {
    const board = []
    let count = 0
    for (let i = 0; i < size; i++) {
        const row = []
        for (let j = 0; j < size; j++) {
            row.push(renderSquare(count++, squares, winSquares, onClick))
        }
        board.push(<div key={i} className="board-row">{row}</div>)
    }
    return <div>{board}</div>
}

export default Board