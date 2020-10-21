import React, { useState } from 'react'
import Board from './Board'
import ToogleButton from './ToogleButton'

function Game({ size }) {
    const [history, setHistory] = useState([{ squares: Array(size * size).fill(null) }]);
    const [displayHistoryAscending, setDisplayStyle] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const getLocation = (index, size) => {
        const X = Math.floor(index / size + 1);
        const Y = index % size + 1;
        return { X: X, Y: Y };
    }

    const handleClick = (i) => {
        const history_copy = history.slice(0, stepNumber + 1);
        const currentcopy = history_copy[history_copy.length - 1];
        const squares = currentcopy.squares.slice();
        if (calculateWinner(squares, size) || squares[i]) return;
        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(history_copy.concat([{
            squares: squares,
            location: getLocation(i, size)
        }]));
        setStepNumber(history_copy.length);
        setXIsNext(!xIsNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step)
        setXIsNext((step % 2) === 0)
    }

    const changeHistoryOrder = () => {
        setDisplayStyle(!displayHistoryAscending)
    }

    const current = history[stepNumber];
    const moves = history.map((step, move) => {
        const locationInfo = move ?
            `Đi ở ô (${history[move].location.X}, ${history[move].location.Y}) \t` :
            ``;
        const buttonDescription = move ?
            `Khôi phục #${move}` :
            `Xoá bàn cờ`;
        const buttonClass = move === stepNumber ?
            `button-highlight` :
            '';
        return (
            <li key={move}>
                {locationInfo}
                <button
                    className={buttonClass}
                    onClick={() => jumpTo(move)}
                >
                    {buttonDescription}
                </button>
            </li>
        );
    });

    function calculateWinner(squares, size) {
        //Kiểm tra hàng ngang
        for (let i = 0; i < size; i++) {
            const winRow = [];
            for (let j = 0; j < size; j++) {
                const index = i * size + j;
                if (squares[index] && squares[index] === squares[i * size]) {
                    winRow.push(index);
                } else {
                    break;
                }
            }
            if (winRow.length === size) {
                return { winner: squares[i * size], winSquares: winRow };
            }
        }

        //Kiểm tra hàng dọc
        for (let i = 0; i < size; i++) {
            const winCol = [];
            for (let j = 0; j < size; j++) {
                const index = j * size + i;
                if (squares[index] && squares[index] === squares[i]) {
                    winCol.push(index);
                } else {
                    break;
                }
            }
            if (winCol.length === size) {
                return { winner: squares[i], winSquares: winCol };
            }
        }

        //Kiểm tra chéo chính
        const winDiag = [];
        for (let i = 0; i < size; i++) {
            const index = i * size + i;
            if (squares[index] && squares[index] === squares[0]) {
                winDiag.push(index);
            } else {
                break;
            }
        }
        if (winDiag.length === size) {
            return { winner: squares[0], winSquares: winDiag };
        }

        //Kiểm tra chéo phụ
        const winDiag2 = [];
        for (let i = 1; i <= size; i++) {
            const index = i * (size - 1);
            if (squares[index] && squares[index] === squares[size - 1]) {
                winDiag2.push(index);
            } else {
                break;
            }
        }
        if (winDiag2.length === size) {
            return { winner: squares[size - 1], winSquares: winDiag2 };
        }
        return null;
    }


    const result = calculateWinner(current.squares, size);
    let status;
    let winSquares = [];
    if (result && result.winner) {
        status = `${result.winner} thắng!`;
        winSquares = result.winSquares;
    } else if (history.length - 1 === Math.pow(size, 2)) {
        status = "Hoà"
    } else {
        status = `Đến lượt ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    size={size}
                    squares={current.squares}
                    winSquares={winSquares}
                    onClick={(i) => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <div>
                    <ToogleButton action={() => changeHistoryOrder()}></ToogleButton>
                </div>
                <ul>{displayHistoryAscending ? moves : moves.reverse()}</ul>
            </div>
        </div>
    )
}

export default Game