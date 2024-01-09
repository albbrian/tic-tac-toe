import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Board from './Board';
import Header from './Header';

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

export const freshMoveHistory = [
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
  const [gameMode, setGameMode] = useState<GameMode>('pvp');

  const navigate = useNavigate();
  const location = useLocation();
  console.log('🚀 ~ TicTacToe ~ location:', location);
  const queryParams = new URLSearchParams(location.search);
  const gameModeQueryParam = queryParams.get('game-mode') as GameMode | null;
  console.log('🚀 ~ TicTacToe ~ gameModeQueryParam:', gameModeQueryParam);
  const isNewQueryParam = queryParams.get('is-new');
  console.log('🚀 ~ TicTacToe ~ isNewQueryParam:', isNewQueryParam);

  const ticTacToeLocalStorage = localStorage.getItem('tic-tac-toe-storage');

  const clearLocalStorage = () => {
    localStorage.removeItem('tic-tac-toe-storage');
  };

  const startNewGame = (newGameMode: GameMode): void => {
    setMoveHistory(freshMoveHistory);
    setIsCrossNext(true);
    setGameMode(newGameMode);
    localStorage.setItem(
      'tic-tac-toe-storage',
      JSON.stringify({
        moveHistory: freshMoveHistory,
        isCrossNext: true,
        gameMode: newGameMode,
      }),
    );
  };

  useEffect(() => {
    if (ticTacToeLocalStorage === null && isNewQueryParam !== null) {
      startNewGame(gameModeQueryParam ?? 'pvp');
    } else {
      const {
        moveHistory: moveHistoryLocalStorage = [],
        isCrossNext: isCrossNextLocalStorage = true,
        gameMode: gameModeLocalStorage = 'pvp',
      } = JSON.parse(ticTacToeLocalStorage ?? '{}');
      setMoveHistory(moveHistoryLocalStorage);
      setIsCrossNext(isCrossNextLocalStorage);
      setGameMode(gameModeLocalStorage);
    }
  }, []);

  const setMove = (index: number): void => {
    const newMoveHistory = [...moveHistory];
    newMoveHistory[index] = isCrossNext ? 'x' : 'o';
    setMoveHistory(newMoveHistory);
    setIsCrossNext(!isCrossNext);

    localStorage.setItem(
      'tic-tac-toe-storage',
      JSON.stringify({
        moveHistory: newMoveHistory,
        isCrossNext: !isCrossNext,
      }),
    );
  };

  useEffect(() => {
    if (gameMode === 'pvc' && !isCrossNext) {
      // PVC mode, computer as circle
      const emptySquareIndexes = moveHistory
        .map((move, index) => (move === null ? index : null))
        .filter((index) => index !== null) as number[];
      const randomIndex = emptySquareIndexes[Math.floor(Math.random() * emptySquareIndexes.length)];
      setMove(randomIndex);
    }
  }, [isCrossNext]);

  const onClickPlayAgain = (): void => {
    clearLocalStorage();
    navigate('/choose-game-mode');
  };

  const winner = checkWinner(moveHistory);
  const isDraw = moveHistory.every((move) => move !== null) && winner === null;

  return (
    <>
      <Header
        gameMode={gameMode}
        isCrossNext={isCrossNext}
        winner={winner}
        isDraw={isDraw}
        onClickPlayAgain={onClickPlayAgain}
      />
      <Board
        moveHistory={moveHistory}
        setMove={setMove}
        isEnd={winner !== null || isDraw}
      />
    </>
  );
}

export default TicTacToe;
