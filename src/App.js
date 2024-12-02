import React, { useState } from 'react';
import Confetti from 'react-confetti';
import './App.css';

const Board = ({ squares, onClick }) => {
  return (
    <div className='board'>
      {squares.map((square, i) => (
        <button key={i} className='square' onClick={() => onClick(i)}>
          {square}
        </button>
      ))}
    </div>
  );
};

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isNext, setIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (i) => {
    const boardCopy = [...board];
    if (boardCopy[i] || winner) return;

    boardCopy[i] = isNext ? 'X' : 'O';
    setBoard(boardCopy);
    setIsNext(!isNext);

    const calculatedWinner = calculateWinner(boardCopy); // Renamed the variable to avoid conflict
    if (calculatedWinner) {
      setWinner(calculatedWinner);
    } else if (boardCopy.every((square) => square)) {
      alert("It's a draw!");
    }
  };

  const refresh = () => {
    setBoard(Array(9).fill(null));
    setIsNext(true);
    setWinner(null);
  };

  const status = winner ? `Winner: ${winner}` : `Next player: ${isNext ? 'X' : 'O'}`;

  return (
    <div className='game-container'>
      <div className="game">
        {winner && <Confetti />}
        <h1 className='title'>Tic-Tac-Toe</h1>
        <Board squares={board} onClick={handleClick} />
        <div className="game-info">
          <div className="statustext">{status}</div>
          <button onClick={refresh}>Refresh</button>
        </div>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
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
      return squares[a];
    }
  }
  return null;
};

export default App;
