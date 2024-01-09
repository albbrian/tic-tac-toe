/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';

function GameModes() {
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickPvp = () => {
    navigate('/tic-tac-toe?game-mode=pvp&is-new');
  };

  const onClickPvc = () => {
    navigate('/tic-tac-toe?game-mode=pvc&is-new');
  };

  return (
    // give me tsx for two cards for choosing either new game or resume the previous game, one on the left and one on the right
    <div className="landing">
      <div className="card" onClick={onClickPvp} role="button" tabIndex={0} data-testid="pvp-button">
        <img src="/pvp.png" alt="PVP: player vs player" />
        <h1>Player vs Player</h1>
      </div>
      <div className="card" onClick={onClickPvc} role="button" tabIndex={0} data-testid="pvc-button">
        <img src="/pvc.png" alt="PVC: player vs computer" />
        <h1>Player vs Computer</h1>
      </div>
    </div>
  );
}

export default GameModes;
