// unit test for the Board component written with react testing libarary and jest
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from '../../components/Board';
import { freshMoveHistory } from '../../components/TicTacToe';

describe('Board', () => {
  it('should render the board component', () => {
    const setMove = jest.fn();
    const { getByTestId } = render(
      <Board moveHistory={freshMoveHistory} setMove={setMove} isEnd={false} />,
    );
    const board = getByTestId('board');
    expect(board).toBeInTheDocument();
  });

  it('should reflect the moveHistory prop correctly', () => {
    const setMove = jest.fn();
    const moveHistory: (Participant | null)[] = [null, 'x', 'o', null, 'x', 'o', null, 'x', 'o'];
    const { getAllByTestId } = render(
      <Board moveHistory={moveHistory} setMove={setMove} isEnd={false} />,
    );
    const squares = getAllByTestId('square');
    squares.forEach((square, index) => {
      if (moveHistory[index] !== null) {
        expect(square).toHaveTextContent(moveHistory[index] as string);
      } else {
        expect(square).toHaveTextContent('');
      }
    });
  });

  it('should render the board component with 9 squares', () => {
    const setMove = jest.fn();
    const { getAllByTestId } = render(
      <Board moveHistory={freshMoveHistory} setMove={setMove} isEnd={false} />,
    );
    const squares = getAllByTestId('square');
    expect(squares.length).toBe(9);
  });

  describe('should invoke setMove() with and argument of index when the square is clicked', () => {
    const testCases = Array(9).fill(null).map((_, idx) => ({
      idx,
      testName: `should invoke setMove() with and argument of ${idx} when square ${
        idx + 1
      } is clicked`,
    }));
    test.each(testCases)('$testName', ({ idx }) => {
      const setMove = jest.fn();
      const { getAllByTestId } = render(
        <Board moveHistory={freshMoveHistory} setMove={setMove} isEnd={false} />,
      );
      const squares = getAllByTestId('square');
      const squareIdxToClick = idx;
      squares[squareIdxToClick].click();

      expect(setMove).toHaveBeenCalledTimes(1);
      expect(setMove).toHaveBeenCalledWith(squareIdxToClick);
    });
  });

  it('should not call setMove when isEnd is true', () => {
    const setMove = jest.fn();
    const moveHistory = Array(9).fill(null);
    const { getAllByTestId } = render(
      <Board moveHistory={moveHistory} setMove={setMove} isEnd />,
    );
    const squares = getAllByTestId('square');
    fireEvent.click(squares[0]);
    expect(setMove).not.toHaveBeenCalled();
  });

  it('should not call setMove when the square is already filled', () => {
    const setMove = jest.fn();
    const moveHistory: (Participant | null)[] = ['x', null, null, null, null, null, null, null, null];
    const { getAllByTestId } = render(
      <Board moveHistory={moveHistory} setMove={setMove} isEnd={false} />,
    );
    const squares = getAllByTestId('square');
    fireEvent.click(squares[0]);
    expect(setMove).not.toHaveBeenCalled();
  });
});
