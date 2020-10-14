import React from 'react'
import Board from './Board'
import ToogleButton from './ToogleButton'

class Game extends React.Component {

    constructor(props) {
        super(props);
        const totalSquareCount = Math.pow(this.props.size, 2);
        this.state = {
            history: [
                { squares: Array(totalSquareCount).fill(null) }
            ],
            displayHistoryAscending: true,
            stepNumber: 0,
            xIsNext: true
        };
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares, this.props.size) || squares[i]) return;
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                location: this.getLocation(i, this.props.size)
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    getLocation(index, size) {
        const X = Math.floor(index / size + 1);
        const Y = index % size + 1;
        return { X: X, Y: Y };
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    changeHistoryOrder() {
        this.setState({
            displayHistoryAscending: !this.state.displayHistoryAscending
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const moves = history.map((step, move) => {
            const locationInfo = move ?
                `Đi ở ô (${history[move].location.X}, ${history[move].location.Y}) \t` :
                ``;
            const buttonDescription = move ?
                `Khôi phục #${move}` :
                `Xoá bàn cờ`;
            const buttonClass = move === this.state.stepNumber ?
                `button-highlight` :
                '';
            return (
                <li key={move}>
                    {locationInfo}
                    <button
                        className={buttonClass}
                        onClick={() => this.jumpTo(move)}
                    >
                        {buttonDescription}
                    </button>
                </li>
            );
        });

        const result = calculateWinner(current.squares, this.props.size);
        let status;
        let winSquares = [];
        if (result && result.winner) {
            status = `${result.winner} thắng!`;
            winSquares = result.winSquares;
        } else if (history.length - 1 === Math.pow(this.props.size, 2)) {
            status = "Hoà"
        } else {
            status = `Đến lượt ${this.state.xIsNext ? 'X' : 'O'}`;
        }
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        size={this.props.size}
                        squares={current.squares}
                        winSquares={winSquares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>
                        <ToogleButton action={() => this.changeHistoryOrder()}></ToogleButton>
                    </div>
                    <ul>{this.state.displayHistoryAscending ? moves : moves.reverse()}</ul>
                </div>
            </div>
        );
    }
}

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

export default Game