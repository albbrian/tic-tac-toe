describe('Tic Tac Toe game', () => {
  it('completes a game with player vs player mode', () => {
    // Visit the game page
    cy.visit('http://localhost:3000/');
    cy.get('[data-testid="new-game-btn"]').should('exist');
    cy.get('[data-testid="continue-prev-game-btn"]').should('not.exist');
    //test

    // Select New Game
    cy.get('[data-testid="new-game-btn"]').click();

    // Select game mode
    cy.get('[data-testid="pvp-button"]').click();
    cy.get('[data-testid="game-mode-message"]').should('contain', 'Game mode: pvp');
    cy.get('[data-testid="header-message"]').should('contain', 'This is Cross\'s turn');

    // Make moves
    cy.get('[data-testid="square-0"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'This is Circle\'s turn');

    cy.get('[data-testid="square-1"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'This is Cross\'s turn');

    cy.reload(true);
    cy.screenshot('board_after_refresh');
    cy.get('[data-testid="header-message"]').should('contain', 'This is Cross\'s turn');
    cy.get('[data-testid="square-0"]').should('contain', 'x');
    cy.get('[data-testid="square-1"]').should('contain', 'o');

    cy.visit('http://localhost:3000/');

    cy.get('[data-testid="new-game-btn"]').should('exist');
    cy.get('[data-testid="continue-prev-game-btn"]').should('exist');

    cy.get('[data-testid="continue-prev-game-btn"]').click();
    cy.get('[data-testid="header-message"]').should('contain', 'This is Cross\'s turn');
    cy.get('[data-testid="square-0"]').should('contain', 'x');
    cy.get('[data-testid="square-1"]').should('contain', 'o');

    cy.screenshot('board_after_refresh_and_continue');
  });
});
