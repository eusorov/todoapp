import React from 'react';
import './style.css';
import TicTacToe from './TicTacToe';

function TicTacToeMain() {
    return (
        <div className="App">
            <h1>Tic Tac Toe</h1>
            <TicTacToe />
        </div>
    );
}

export default TicTacToeMain;
