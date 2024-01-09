import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
// import { createMemorySource, createHistory } from '@reach/router';
import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicTacToe, {freshMoveHistory} from '../../components/TicTacToe';

describe('TicTacToe', () => {
  /* beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
        removeItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  }); */

  /* it('renders the game board', () => {
    const { getByTestId } = render(
      <TicTacToe />
    );
    expect(getByTestId('board')).toBeInTheDocument();
  }); */

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
          <Routes>
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
          </Routes>
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
          <Routes>
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
          </Routes>
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
      window.history.pushState({}, '', '/tic-tac-toe?game-mode=pvp&is-new=true');

      const { getByTestId, getAllByTestId } = render(
        <Router>
          <Routes>
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
          </Routes>
        </Router>,
      );

      const header = getByTestId('header');
      expect(header).toHaveTextContent('Game mode: pvp');

      const squares = getAllByTestId('square');
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
      window.history.pushState({}, '', '/tic-tac-toe?game-mode=pvp&is-new=true');

      const { getByTestId, getAllByTestId } = render(
        <Router>
          <Routes>
            <Route path="/tic-tac-toe" element={<TicTacToe />} />
          </Routes>
        </Router>,
      );

      const header = getByTestId('header');
      expect(header).toHaveTextContent('Game mode: pvp');
      expect(header).toHaveTextContent('Play Again');

      const squares = getAllByTestId('square');
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
