import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Landing from '../../components/Landing';

describe('Landing', () => {
  describe('When there is no previous game', () => {
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

    it('Should render the 1 card with text "New Game"', () => {
      window.history.pushState({}, '', '/landing');
      render(
        <Router>
          <Landing />
        </Router>,
      );

      expect(screen.getByText('New Game')).toBeInTheDocument();
      expect(screen.queryByText('Continue Previous Game')).toBeNull();
    });

    it('Should navigate to "/choose-game-mode" when click the "New Game" button', () => {
      window.history.pushState({}, '', '/landing');
      const { getByTestId } = render(
        <Router>
          <Landing />
        </Router>,
      );

      const newGameButton = getByTestId('new-game-btn');
      fireEvent.click(newGameButton);
      expect(window.location.pathname).toBe('/choose-game-mode');
    });
  });

  describe('When there is a previous game', () => {
    beforeEach(() => {
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
    });

    it('Should render the 2 cards with text "New Game" and "Continue Previous Game"', () => {
      window.history.pushState({}, '', '/landing');
      render(
        <Router>
          <Landing />
        </Router>,
      );

      expect(screen.getByText('New Game')).toBeInTheDocument();
      expect(screen.getByText('Continue Previous Game')).toBeInTheDocument();
    });

    it('Should show confirmation pop up when click the "New Game" button', () => {
      window.history.pushState({}, '', '/landing');
      const { getByTestId } = render(
        <Router>
          <Landing />
        </Router>,
      );

      const newGameButton = getByTestId('new-game-btn');
      fireEvent.click(newGameButton);
      expect(window.location.pathname).not.toBe('/choose-game-mode');
      expect(window.location.pathname).toBe('/landing');

      expect(screen.getByText('Previous game progress will be removed, continue?')).toBeInTheDocument();
    });

    it('Should navigate to "/choose-game-mode" when "OK" is clicked in the confirmation pop up', () => {
      window.history.pushState({}, '', '/landing');
      const { getByTestId } = render(
        <Router>
          <Landing />
        </Router>,
      );

      const newGameButton = getByTestId('new-game-btn');
      fireEvent.click(newGameButton);

      fireEvent.click(screen.getByText('OK'));
      expect(window.location.pathname).toBe('/choose-game-mode');
    });

    it('Should stay in "/landing" when "Cancel" is clicked in the confirmation pop up', () => {
      window.history.pushState({}, '', '/landing');
      const { getByTestId } = render(
        <Router>
          <Landing />
        </Router>,
      );

      const newGameButton = getByTestId('new-game-btn');
      fireEvent.click(newGameButton);

      fireEvent.click(screen.getByText('Cancel'));
      expect(window.location.pathname).toBe('/landing');
    });

    it('Should navigate to "/tic-tac-toe" when "Continue Previous Game" button is clicked', () => {
      window.history.pushState({}, '', '/landing');
      const { getByTestId } = render(
        <Router>
          <Landing />
        </Router>,
      );

      const continuePrevGameButton = getByTestId('continue-prev-game-btn');
      fireEvent.click(continuePrevGameButton);

      expect(window.location.pathname).toBe('/tic-tac-toe');
    });
  });
});
