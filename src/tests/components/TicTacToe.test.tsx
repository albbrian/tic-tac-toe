import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TicTacToe, { freshMoveHistory } from '../../components/TicTacToe';

describe('TicTacToe', () => {
  describe('when the localStorage do not have data for the game', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(null),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        },
        writable: true,
      });
    });

    it('setItem to localStorage and render the header correctly for path: /tic-tac-toe?game-mode=pvp&is-new=true', () => {
      window.history.pushState({}, '', '/tic-tac-toe?game-mode=pvp&is-new=true');

      const { getByTestId } = render(
        <Router>
          <TicTacToe />
        </Router>,
      );

      const header = getByTestId('header');
      expect(header).toHaveTextContent('Game mode: pvp');

      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.setItem).toHaveBeenCalledWith('tic-tac-toe-storage', JSON.stringify({
        moveHistory: freshMoveHistory,
        isCrossNext: true,
        gameMode: 'pvp',
      }));
    });

    it('setItem to localStorage and render the header correctly for path: /tic-tac-toe?game-mode=pvp&is-new=true', () => {
      window.history.pushState({}, '', '/tic-tac-toe?game-mode=pvc&is-new=true');

      const { getByTestId } = render(
        <Router>
          <TicTacToe />
        </Router>,
      );

      const header = getByTestId('header');
      expect(header).toHaveTextContent('Game mode: pvc');

      expect(window.localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(window.localStorage.setItem).toHaveBeenCalledWith('tic-tac-toe-storage', JSON.stringify({
        moveHistory: freshMoveHistory,
        isCrossNext: true,
        gameMode: 'pvc',
      }));
    });

    const testCases = Array(9).fill(null).map((_, idx) => ({
      idx,
      testName: `should invoke localStorage.setItem with correct data when square ${
        idx + 1
      } is clicked`,
    }));

    test.each(testCases)('$testName', ({ idx }) => {
      window.history.pushState({}, '', '/tic-tac-toe?game-mode=pvp&is-new=true');
      const { getAllByTestId } = render(
        <Router>
          <TicTacToe />
        </Router>,
      );
      const squares = getAllByTestId(/square-\d/);
      const squareIdxToClick = idx;
      squares[squareIdxToClick].click();

      expect(window.localStorage.setItem).toHaveBeenCalledTimes(2);
      expect(window.localStorage.setItem).toHaveBeenNthCalledWith(1, 'tic-tac-toe-storage', JSON.stringify({
        moveHistory: freshMoveHistory,
        isCrossNext: true,
        gameMode: 'pvp',
      }));
      const expectedMoveHistory: (Participant | null)[] = [...freshMoveHistory];
      expectedMoveHistory[squareIdxToClick] = 'x';
      expect(window.localStorage.setItem).toHaveBeenNthCalledWith(2, 'tic-tac-toe-storage', JSON.stringify({
        moveHistory: expectedMoveHistory,
        isCrossNext: false,
        gameMode: 'pvp',
      }));
    });
  });

  describe('when the localStorage do have previous data for the game', () => {
    it('render the header and the board correctly ', () => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(JSON.stringify({
            moveHistory: ['o', 'x', null, null, null, null, null, null, null],
            isCrossNext: true,
            gameMode: 'pvp',
          })),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        },
        writable: true,
      });
      window.history.pushState({}, '', '/tic-tac-toe');

      const { getByTestId, getAllByTestId } = render(
        <Router>
          <TicTacToe />
        </Router>,
      );

      const header = getByTestId('header');
      expect(header).toHaveTextContent('Game mode: pvp');

      const squares = getAllByTestId(/square-\d/);
      expect(squares[0]).toHaveTextContent('o');
      expect(squares[1]).toHaveTextContent('x');
      expect(squares[2]).toHaveTextContent('');
      expect(squares[3]).toHaveTextContent('');
      expect(squares[4]).toHaveTextContent('');
      expect(squares[5]).toHaveTextContent('');
      expect(squares[6]).toHaveTextContent('');
      expect(squares[7]).toHaveTextContent('');
      expect(squares[8]).toHaveTextContent('');
    });

    it('render the header with the winner and the board correctly, and render the "Play Again" button correctly', () => {
      Object.defineProperty(window, 'localStorage', {
        value: {
          getItem: jest.fn().mockReturnValue(JSON.stringify({
            moveHistory: ['x', 'o', 'o', 'o', 'o', 'x', 'x', 'x', 'x'],
            isCrossNext: true,
            gameMode: 'pvp',
          })),
          setItem: jest.fn(),
          removeItem: jest.fn(),
          clear: jest.fn(),
        },
        writable: true,
      });
      window.history.pushState({}, '', '/tic-tac-toe');

      const { getByTestId, getAllByTestId } = render(
        <Router>
          <TicTacToe />
        </Router>,
      );

      const header = getByTestId('header');
      expect(header).toHaveTextContent('Game mode: pvp');
      expect(header).toHaveTextContent('Play Again');

      const squares = getAllByTestId(/square-\d/);
      expect(squares[0]).toHaveTextContent('x');
      expect(squares[1]).toHaveTextContent('o');
      expect(squares[2]).toHaveTextContent('o');
      expect(squares[3]).toHaveTextContent('o');
      expect(squares[4]).toHaveTextContent('o');
      expect(squares[5]).toHaveTextContent('x');
      expect(squares[6]).toHaveTextContent('x');
      expect(squares[7]).toHaveTextContent('x');
      expect(squares[8]).toHaveTextContent('x');

      const playAgainButton = getByTestId('play-again-button');
      expect(playAgainButton).toBeInTheDocument();

      fireEvent.click(playAgainButton);
      expect(window.location.pathname).toBe('/choose-game-mode');
    });
  });
});
