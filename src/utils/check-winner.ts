const checkWinner = (moveHistory: (Participant | null)[]): Participant | null => {
  const winningPatterns = [
    [0, 1, 2], // first row
    [3, 4, 5], // second row
    [6, 7, 8], // third row
    [0, 3, 6], // first column
    [1, 4, 7], // second column
    [2, 5, 8], // third column
    [0, 4, 8], // diagonal
    [2, 4, 6], // diagonal
  ];

  for (let i = 0; i < winningPatterns.length; i += 1) {
    const [a, b, c] = winningPatterns[i];
    if (moveHistory[a] && moveHistory[a] === moveHistory[b] && moveHistory[a] === moveHistory[c]) {
      return moveHistory[a];
    }
  }

  return null;
};

export default checkWinner;
