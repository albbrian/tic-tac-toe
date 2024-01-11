import React from 'react';
import { useNavigate } from 'react-router-dom';

const pathName = process.env.PUBLIC_URL;

function GameModes() {
  const navigate = useNavigate();

  const onClickPvp = () => {
    navigate('/tic-tac-toe?game-mode=pvp&is-new');
  };

  const onClickPvc = () => {
    navigate('/tic-tac-toe?game-mode=pvc&is-new');
  };

  return (
    <div className="landing">
      <div className="card" onClick={onClickPvp} onKeyDown={onClickPvp} role="button" tabIndex={0} data-testid="pvp-button">
        <img src={`${pathName}/images/pvp.png`} alt="PVP: player vs player" />
        <h1>Player vs Player</h1>
      </div>
      <div className="card" onClick={onClickPvc} onKeyDown={onClickPvc} role="button" tabIndex={0} data-testid="pvc-button">
        <img src={`${pathName}/images/pvc.png`} alt="PVC: player vs computer" />
        <h1>Player vs Computer</h1>
      </div>
    </div>
  );
}

export default GameModes;
