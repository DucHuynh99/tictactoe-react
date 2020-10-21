import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Game from './Game'
import './index.css';

const MIN_BOARD_SIZE = 3;
const MAX_BOARD_SIZE = 5;

function App() {
    const [boardSize, setBoardSize] = useState(3);
    const options = [];
    for (let i = MIN_BOARD_SIZE; i <= MAX_BOARD_SIZE; i++) {
        options.push(<option value={i}>{i}</option>)
    }
    return (
        <div>
            <form className="form">
                <label for="size">Kích thước bàn cờ: </label>
                <select id="size" onChange={(event) => setBoardSize(parseInt(event.target.value))}>
                    {options}
                </select>
            </form>
            <Game key={boardSize} size={boardSize} />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)