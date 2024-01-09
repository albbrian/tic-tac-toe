import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Square from '../../components/Square';

describe('Square', () => {
  it('renders the value prop', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Square value="x" onClickSquare={onClick} />);
    const square = getByTestId('square');
    expect(square).toHaveTextContent('x');

    const button = getByTestId('square-button');
    expect(button).toHaveTextContent('x');
    expect(button).toHaveClass('visible');
  });

  it('calls the onClick function when clicked', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Square value="x" onClickSquare={onClick} />);
    fireEvent.click(getByTestId('square'));
    expect(onClick).toHaveBeenCalled();
  });

  it('renders an empty string and does not have the "visible" class when value is null', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Square value={null} onClickSquare={onClick} />);
    const button = getByTestId('square-button');
    expect(button).toHaveTextContent('');
    expect(button).not.toHaveClass('visible');
  });
});
