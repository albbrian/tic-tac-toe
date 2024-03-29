import React from 'react';
import './Board.scss';
import { message } from 'antd';
import Square from './Square';

function Board({
  moveHistory,
  setMove,
  isEnd,
}: {
  moveHistory: (Participant | null)[];
  setMove: (index: number) => void;
  isEnd: boolean;
}) {
  const [messageApi, contextHolder] = message.useMessage();

  const onClickSquare = (index: number) => {
    if (isEnd) {
      console.log('Game has already ended!');
      messageApi.error('Game has already ended!');

      return;
    }

    if (moveHistory[index] !== null) {
      console.log(`Square ${index} is already filled!`);
      messageApi.error(`Square ${index} is already filled!`);

      return;
    }

    setMove(index);
  };

  return (
    <>
      {contextHolder}
      <div className="board" data-testid="board">
        <div className="row">
          <Square value={moveHistory[0]} onClickSquare={() => onClickSquare(0)} idx="0" />
          <Square value={moveHistory[1]} onClickSquare={() => onClickSquare(1)} idx="1" />
          <Square value={moveHistory[2]} onClickSquare={() => onClickSquare(2)} idx="2" />
        </div>
        <div className="row">
          <Square value={moveHistory[3]} onClickSquare={() => onClickSquare(3)} idx="3" />
          <Square value={moveHistory[4]} onClickSquare={() => onClickSquare(4)} idx="4" />
          <Square value={moveHistory[5]} onClickSquare={() => onClickSquare(5)} idx="5" />
        </div>
        <div className="row">
          <Square value={moveHistory[6]} onClickSquare={() => onClickSquare(6)} idx="6" />
          <Square value={moveHistory[7]} onClickSquare={() => onClickSquare(7)} idx="7" />
          <Square value={moveHistory[8]} onClickSquare={() => onClickSquare(8)} idx="8" />
        </div>
      </div>
    </>
  );
}

export default Board;
