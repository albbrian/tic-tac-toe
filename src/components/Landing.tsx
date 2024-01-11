/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './card-layout.scss';
import { Modal } from 'antd';

const pathName = process.env.PUBLIC_URL || '/';

function Landing() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const ticTacToeLocalStorage = localStorage.getItem('tic-tac-toe-storage');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onClickNewGame = () => {
    if (!ticTacToeLocalStorage) {
      navigate('/choose-game-mode');
    } else {
      setIsModalOpen(true);
    }
  };

  const handleConfirmNewGame = () => {
    setIsModalOpen(false);
    localStorage.removeItem('tic-tac-toe-storage');
    navigate('/choose-game-mode');
  };

  const handleCancelNewGame = () => {
    setIsModalOpen(false);
  };

  const onClickContinue = () => {
    navigate('/play');
  };

  return (
    // give me tsx for two cards for choosing either new game or resume the previous game, one on the left and one on the right
    <div className="card-layout">
      <div className="card" onClick={onClickNewGame} role="button" tabIndex={0} data-testid="new-game-btn">
        <img src={`${pathName}/images/new_game.png`} alt="new game" />
        <h1>New Game</h1>
      </div>
      {(() => ticTacToeLocalStorage && (
        <div className="card" onClick={onClickContinue} role="button" tabIndex={0} data-testid="continue-prev-game-btn">
          <img src={`${pathName}/images/continue.png`} alt="continue previous game" />
          <h1>Continue Previous Game</h1>
        </div>
      ))()}
      <Modal title="Confirm to continue?" open={isModalOpen} onOk={handleConfirmNewGame} onCancel={handleCancelNewGame}>
        <p>Previous game progress will be removed, continue?</p>
      </Modal>
    </div>
  );
}

export default Landing;
