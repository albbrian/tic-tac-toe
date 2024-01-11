describe.only('Tic Tac Toe game', () => {
  it('completes a game with player vs computer mode', () => {
    // Visit the game page
    cy.visit('http://localhost:3000/tic-tac-toe');
    cy.screenshot('1_landing_page');

    // Select New Game
    cy.get('[data-testid="new-game-btn"]').click();
    cy.screenshot('2_choose_game_mode');

    // Select game mode
    cy.get('[data-testid="pvc-button"]').click();
    cy.screenshot('3_tic_tac_toe_game');
    cy.get('[data-testid="game-mode-message"]').should('contain', 'Game mode: pvc');
    cy.get('[data-testid="header-message"]').should('contain', 'Player it is your turn. You are Cross.');

    // Make moves
    for (let i = 0; i < 9; i += 1) {
      cy.get(`[data-testid="square-${i}"]`).click();
    }

    cy.screenshot('4_show_winner');

    cy.get('[data-testid="play-again-button"]').click();
    cy.screenshot('5_play_again');
  });
});
