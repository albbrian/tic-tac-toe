import React from 'react';
import './Square.scss';

function Square({ value, onClickSquare }: { value: string | null, onClickSquare: () => void }) {
  let classNames = 'square__btn';

  if (value !== null) {
    classNames += ' visible';
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className="square" onClick={onClickSquare}>
      <button type="button" className={classNames}>{ value ?? '' }</button>
      {/* <span className={classNames}>{ value ?? '' }</span> */}
    </div>
  );
}

export default Square;
