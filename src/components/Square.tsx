import React from 'react';
import './Square.scss';

function Square({
  value,
  onClickSquare,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  idx,
}: {
  value: Participant | null;
  onClickSquare: () => void;
  idx?: string;
}) {
  const classNames = ['button'];

  if (value !== null) {
    classNames.push('visible');
  }

  const dataTestId = idx !== undefined ? `square-${idx}` : 'square';
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="square" onClick={onClickSquare} data-testid={dataTestId}>
      <button type="button" className={classNames.join(' ')} data-testid="square-button">
        {value ?? ''}
      </button>
    </div>
  );
}

Square.defaultProps = {
  idx: undefined,
};

export default Square;
