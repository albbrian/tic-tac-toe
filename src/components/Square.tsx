import React from 'react';
import './Square.scss';

function Square({
  value,
  onClickSquare,
}: {
  value: Participant | null;
  onClickSquare: () => void;
}) {
  const classNames = ['square__btn'];

  if (value !== null) {
    classNames.push('visible');
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="square" onClick={onClickSquare} data-testid="square">
      <button type="button" className={classNames.join(' ')} data-testid="square-button">
        {value ?? ''}
      </button>
    </div>
  );
}

export default Square;
