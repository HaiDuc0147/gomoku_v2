import React from 'react';
import Board from "./Board";
import { useState } from "react";

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20],
    ];

    for (let i = 0; i < lines.length; i++) {
        var [a, b, c, d, e] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {
            return {
                winnerPlayer: squares[a],
                winnerLocation: [a, b, c, d, e]
            }
        }
    }

    return;
}

function Game() {
    const historyInit = [{
        squares: Array(25).fill(null),
        moveLocation: '',
    }];

    const [history, setHistory] = useState(historyInit);
    const [xIsNext, setXIsNext] = useState(true);
    const [stepNumber, setStepNumber] = useState(0);
    const [isReverse, setIsReverse] = useState(false);


    const handleClick = (i) => {
        const historyClick = history.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (squares[i] || calculateWinner(squares)) {
            return;
        }

        const gameSize = Math.sqrt(history[0].squares.length);
        const moveLocation = [Math.floor(i / gameSize + 1), i % gameSize + 1].join(', ');

        squares[i] = xIsNext ? 'X' : 'O';
        setHistory(historyClick.concat([{
            squares,
            moveLocation
        }]));
        setXIsNext(!xIsNext);
        setStepNumber(history.length);
    }

    const jumpTo = move => {
        setXIsNext((move % 2) ? false : true);
        setStepNumber(move)
    }

    const reverseSort = isReverse => {
        setIsReverse(!isReverse)
    }

    //history = this.state.history;
    let current = history[stepNumber];
    let winner = calculateWinner(current.squares);
    //isReverse = this.state.isReverse;
    let status;

    if (winner) {
        status = `Winner is: ${winner.winnerPlayer}`;
    } else if (stepNumber === 25) {
        status = "Draw";
    } else {
        status = `Next player is: ${xIsNext ? 'X' : 'O'}`;
    }

    const moves = history.map((step, move) => {
        const desc = move ? `Move #${move} (${step.moveLocation})` : 'Start game';
        return (
            <li key={move}><a href="#" onClick={() => jumpTo(move)}>{desc}</a></li>
        );
    });

    return (
        <div>
            <div className="game">
                <Board squares={current.squares}
                    onClick={i => handleClick(i)}
                    winner={winner && winner.winnerLocation} />
                <div className="game-info">
                    <p>{status}</p>
                    <ol reversed={isReverse ? 'reverse' : ''}>{isReverse ? moves.reverse() : moves}</ol>
                    <button onClick={() => reverseSort(isReverse)}>Reverse list</button>
                </div>
            </div>

        </div>
    );

}

export default Game;