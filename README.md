# Tic-Tac-Toe

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## The Tic-Tac-Toe App is deployed to Github Pages
<a href="https://albbrian.github.io/tic-tac-toe" target="_blank">Play Here</a>

## Implementation Highlights
1. Game state is persisted if the web app is refreshed. 
2. The <a href="https://albbrian.github.io/tic-tac-toe" target="_blank">Landing Page</a> will provide option to resume previous game.
![Image](README/images/continue_previous_game.png)

3. Confirmation box is prompt to confirm user, when starting a new game, remove the previous game state.

4. PVP (Player vs Player) and PVC (Player vs Computer) mode is available. PVC mode is implemented using randomized moves.
![Image](README/images/game_modes.png)

5. Unit test are written with high coverage.
   ![Image](README/images/unit_test_coverage.png)
6. End to end testing is implemented using Cypress on following flow
   1. Play through a game in PVP mode
   2. Play through a game in PVP mode, refresh a page, visit the landing page and continue the game
   3. Play through a game in PVC mode
7. Setup CI/CD on github actions to run unit tests, e2e tests, and deploy the app to github
pages <a href="https://albbrian.github.io/tic-tac-toe" target="_blank">Here</a>