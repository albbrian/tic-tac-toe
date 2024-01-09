import React from 'react';
import './Square.scss';

function Square({ value, onClickSquare }: { value: string | null, onClickSquare: () => void }) {
  return (
    <div className="square">
      <button type="button" className="square__btn" onClick={onClickSquare}>{ value ?? '' }</button>
    </div>
  );
}

export default Square;
