import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import GameModes from '../../components/GameModes';
import { BrowserRouter as Router } from 'react-router-dom';

describe('GameModes', () => {
  it('Should render the 2 cards with text "Player vs Player" and "Player vs Computer"', () => {
    render(
      <Router>
        <GameModes />
      </Router>,
    );

    expect(screen.getByText('Player vs Player')).toBeInTheDocument();
    expect(screen.getByText('Player vs Computer')).toBeInTheDocument();
  });

  it('Should navigate to "tic-tac-toe?game-mode=pvp&is-new" when click the pvp button', () => {
    const { getByTestId } = render(
      <Router>
        <GameModes />
      </Router>,
    );

    const pvpButton = getByTestId('pvp-button');
    fireEvent.click(pvpButton);
    expect(window.location.pathname).toBe('/tic-tac-toe');
    expect(window.location.search).toBe('?game-mode=pvp&is-new');
  });

  it('Should navigate to "tic-tac-toe?game-mode=pvc&is-new" when click the pvc button', () => {
    const { getByTestId } = render(
      <Router>
        <GameModes />
      </Router>,
    );

    const pvpButton = getByTestId('pvc-button');
    fireEvent.click(pvpButton);
    expect(window.location.pathname).toBe('/tic-tac-toe');
    expect(window.location.search).toBe('?game-mode=pvc&is-new');
  });
});
