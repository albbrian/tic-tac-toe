import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import GameModes from '../../components/GameModes';

describe('GameModes', () => {
  it('Should render the 2 cards with text "Player vs Player" and "Player vs Computer"', () => {
    window.history.pushState({}, '', '/choose-game-mode');
    render(
      <Router>
        <GameModes />
      </Router>,
    );

    expect(screen.getByText('Player vs Player')).toBeInTheDocument();
    expect(screen.getByText('Player vs Computer')).toBeInTheDocument();
  });

  it('Should navigate to "play?game-mode=pvp&is-new" when click the pvp button', () => {
    window.history.pushState({}, '', '/choose-game-mode');
    const { getByTestId } = render(
      <Router>
        <GameModes />
      </Router>,
    );

    const pvpButton = getByTestId('pvp-button');
    fireEvent.click(pvpButton);
    expect(window.location.pathname).toBe('/play');
    expect(window.location.search).toBe('?game-mode=pvp&is-new');
  });

  it('Should navigate to "play?game-mode=pvc&is-new" when click the pvc button', () => {
    window.history.pushState({}, '', '/choose-game-mode');
    const { getByTestId } = render(
      <Router>
        <GameModes />
      </Router>,
    );

    const pvpButton = getByTestId('pvc-button');
    fireEvent.click(pvpButton);
    expect(window.location.pathname).toBe('/play');
    expect(window.location.search).toBe('?game-mode=pvc&is-new');
  });
});
