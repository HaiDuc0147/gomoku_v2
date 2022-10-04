import React from 'react';
import Square from "./Square";

function Board(props) {
    const renderSquare = (i) => {
        const { squares, winner } = props;
        console.log(props)
        return <Square value={squares[i]}
            onClick={() => props.onClick(i)} winner={winner && winner.includes(i) ? 'winner' : ''} />
    };

    const renderBoard = () => {
        const rowsWidth = Array(Math.sqrt(props.squares.length)).fill(null);
        const celsWidth = rowsWidth;
        const board = rowsWidth.map((row, i) => {
            const squares = celsWidth.map((cel, j) => {
                const squareIndex = i * rowsWidth.length + j;
                return (
                    <span key={squareIndex}>{renderSquare(squareIndex)}</span>
                );
            });
            return <div key={i}>{squares}</div>
        });
        return board;
    }

    const board = renderBoard();
    return (
        <div>{board}</div>
    );
}

export default Board;