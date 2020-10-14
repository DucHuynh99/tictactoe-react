import React from 'react'
import Square from './Square'

class Board extends React.Component {

    renderSquare(i) {
        const winsquares = this.props.winSquares;
        const squareClass = winsquares && Array.from(winsquares).includes(i) ?
            `square-highlight` :
            `square`;
        return (
            <Square
                key={i}
                className={squareClass}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    renderBoard(size) {
        const board = [];
        let count = 0;
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                row.push(this.renderSquare(count++));
            }
            board.push(<div key={i} className="board-row">{row}</div>);
        }
        return (<div>{board}</div>);
    }

    render() {
        return this.renderBoard(this.props.size);
    }
}

export default Board