import React, { useEffect, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import Board from './Board';
import Header from './Header';
import checkWinner from '../utils/check-winner';

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
  const queryParams = new URLSearchParams(location.search);
  const gameModeQueryParam = queryParams.get('game-mode') as GameMode | null;
  const isNewQueryParam = queryParams.get('is-new');

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
        gameMode,
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
