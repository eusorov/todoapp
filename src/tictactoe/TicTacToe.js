import React, { useState } from 'react';
import Square from './Square';

function TicTacToe() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [winningLine, setWinningLine] = useState([]);
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        if (player1 && player2) {
            setGameStarted(true);
        } else {
            alert("Please enter names for both players.");
        }
    };

    if (!gameStarted) {
        return (
            <div>
                <input
                    type="text"
                    placeholder="Player 1 (X)"
                    value={player1}
                    onChange={(e) => setPlayer1(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Player 2 (O)"
                    value={player2}
                    onChange={(e) => setPlayer2(e.target.value)}
                />
                <button onClick={startGame}>Start Game</button>
            </div>
        );
    }

    const handleClick = (i) => {
        const newSquares = squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        newSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);

        const winnerInfo = calculateWinner(newSquares);
        if (winnerInfo) {
            setWinningLine(winnerInfo.line);
        } else {
            setWinningLine([]);
        }
    };

    const renderSquare = (i) => {
        return (
            <Square
                value={squares[i]}
                onClick={() => handleClick(i)}
                highlight={winningLine.includes(i)}
            />
        );
    };

    const winner = calculateWinner(squares);
    let status;
    if (winner) {
        status = 'Winner: ' + (winner.winner === 'X' ? player1 : player2);
    } else {
        status = 'Next player: ' + (xIsNext ? player1 + ' (X)' : player2 + ' (O)');
    }

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        setWinningLine([]);
    };

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
            <button className="reset" onClick={resetGame}>Reset Game</button>
        </div>
    );
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
}

export default TicTacToe;
