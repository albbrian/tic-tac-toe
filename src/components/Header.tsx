import React from 'react';

function Header({
  gameMode,
  isCrossNext,
  winner,
  isDraw,
  onClickPlayAgain,
}: {
  gameMode: GameMode;
  isCrossNext: boolean;
  winner: Participant | null;
  isDraw: boolean;
  onClickPlayAgain: () => void;
}) {
  const gameModeMsg = `Game mode: ${gameMode}.`;
  let headerMsg = `This is ${isCrossNext ? 'Cross' : 'Circle'}'s turn`;

  if (gameMode === 'pvc') {
    headerMsg = 'Player it is your turn. You are Cross.';
  } else {
    headerMsg = `This is ${isCrossNext ? 'Cross' : 'Circle'}'s turn`;
  }

  if (winner) {
    headerMsg = `Congratulation! Winner is ${winner === 'o' ? 'Circle' : 'Cross'}.`;
  } else if (isDraw) {
    headerMsg = 'This is a draw.';
  }

  return (
    <div className="whose-turn-header">
      <div>{gameModeMsg}</div>
      <div>{headerMsg}</div>
      {(winner || isDraw) && (
        <button
          className="play-again-button"
          type="button"
          onClick={onClickPlayAgain}
        >
          Play Again
        </button>
      )}
    </div>
  );
}

export default Header;
