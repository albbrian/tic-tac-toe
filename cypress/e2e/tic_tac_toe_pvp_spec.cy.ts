describe('Tic Tac Toe game', () => {
  it('completes a game with player vs player mode', () => {
    // Visit the game page
    cy.visit('http://localhost:3000/');
    cy.screenshot('1_landing_page');

    // Select New Game
    cy.get('[data-testid="new-game-btn"]').click();
    cy.screenshot('2_choose_game_mode');

    // Select game mode
    cy.get('[data-testid="pvp-button"]').click();
    cy.screenshot('3_tic_tac_toe_game');
    cy.get('[data-testid="game-mode-message"]').should('contain', 'Game mode: pvp');
    cy.get('[data-testid="header-message"]').should('contain', 'This is Cross\'s turn');

    // Make moves
    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'This is Circle\'s turn');

    cy.get('[data-testid="square-1"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'This is Cross\'s turn');

    cy.get('[data-testid="square-2"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'This is Circle\'s turn');

    cy.get('[data-testid="square-3"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'This is Cross\'s turn');

    cy.get('[data-testid="square-4"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'This is Circle\'s turn');

    cy.get('[data-testid="square-5"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'This is Cross\'s turn');

    cy.get('[data-testid="square-6"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'Congratulation! Winner is Cross.');
    
    cy.screenshot('4_show_winner');

    cy.get('[data-testid="play-again-button"]').click();
    cy.screenshot('5_play_again');
  });
});