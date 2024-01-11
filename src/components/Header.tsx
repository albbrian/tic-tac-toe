import React from 'react';
import './Header.scss';

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
  const gameModeMsg = `Game mode: ${gameMode}`;
  let headerMsg;

  if (gameMode === 'pvc') {
    headerMsg = (
      <span>
        {'Player it is your turn. You are '}
        <span className="participant">Cross</span>
        .
      </span>
    );
  } else {
    headerMsg = (
      <span>
        {'This is '}
        <span className="participant">
          {isCrossNext ? 'Cross' : 'Circle'}
          &apos;s
        </span>
        {' turn'}
      </span>
    );
  }

  if (winner) {
    headerMsg = (
      <span>
        {'Congratulation! Winner is '}
        <span className="participant">{winner === 'o' ? 'Circle' : 'Cross'}</span>
        .
      </span>
    );
  } else if (isDraw) {
    headerMsg = <span>This is a draw.</span>;
  }

  return (
    <div className="header" data-testid="header">
      <div data-testid="game-mode-message">{gameModeMsg}</div>
      <div data-testid="header-message">{headerMsg}</div>
      {(winner || isDraw) && (
        <button
          className="play-again-button"
          type="button"
          onClick={onClickPlayAgain}
          data-testid="play-again-button"
        >
          Play Again
        </button>
      )}
    </div>
  );
}

export default Header;
