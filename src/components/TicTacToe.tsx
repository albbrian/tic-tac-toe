import React, { useEffect, useState } from 'react';

import './TicTacToe.scss';
import Board from './Board';

const checkWinner = (moveHistory: (Participant | null)[]): Participant | null => {
  const winningPatterns = [
    [0, 1, 2], // first row
    [3, 4, 5], // second row
    [6, 7, 8], // third row
    [0, 3, 6], // first column
    [1, 4, 7], // second column
    [2, 5, 8], // third column
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ];

  for (let i = 0; i < winningPatterns.length; i += 1) {
    const [a, b, c] = winningPatterns[i];
    if (moveHistory[a] && moveHistory[a] === moveHistory[b] && moveHistory[a] === moveHistory[c]) {
      return moveHistory[a];
    }
  }

  return null;
};

const freshMoveHistory = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
];

function TicTacToe() {
  const [moveHistory, setMoveHistory] = useState<(Participant | null)[]>(freshMoveHistory);
  const [isCrossNext, setIsCrossNext] = useState(true);

  useEffect(() => {
    // get local storage item name 'tic-tac-toe-storage'
    const {
      moveHistory: moveHistoryLocalStorage = [],
      isCrossNext: isCrossNextLocalStorage = true,
    } = JSON.parse(localStorage.getItem('tic-tac-toe-storage') ?? '{}');
    setMoveHistory(moveHistoryLocalStorage);
    setIsCrossNext(isCrossNextLocalStorage);
  }, []);

  const setMove = (index: number): void => {
    const newMoveHistory = [...moveHistory];
    newMoveHistory[index] = isCrossNext ? 'x' : 'o';
    setMoveHistory(newMoveHistory);
    setIsCrossNext(!isCrossNext);

    localStorage.setItem('tic-tac-toe-storage', JSON.stringify({
      moveHistory: newMoveHistory,
      isCrossNext: !isCrossNext,
    }));
  };

  const onClickPlayAgain = (): void => {
    setMoveHistory(freshMoveHistory);
    setIsCrossNext(true);
    localStorage.setItem('tic-tac-toe-storage', JSON.stringify({
      moveHistory: freshMoveHistory,
      isCrossNext: true,
    }));
  };

  const winner = checkWinner(moveHistory);

  let headerMsg = `This is ${isCrossNext ? 'Cross' : 'Circle'}'s turn`;
  if (winner) {
    headerMsg = `Congratulation! Winner is ${winner}.`;
  }

  return (
    <>
      <div className="whose-turn-header">
        {headerMsg}
        {
          winner && (
            <button
              className="play-again-button"
              type="button"
              onClick={onClickPlayAgain}
            >
              Play Again
            </button>
          )
        }
      </div>
      <Board
        moveHistory={moveHistory}
        setMove={setMove}
        // isCrossNext={isCrossNext}
        // setIsCrossNext={setIsCrossNext}
        isEnd={winner !== null}
      />
    </>
  );
}

export default TicTacToe;
