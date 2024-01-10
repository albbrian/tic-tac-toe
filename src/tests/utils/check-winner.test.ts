import checkWinner from '../../utils/check-winner';

describe('checkWinner', () => {
  it('returns the winner x', () => {
    const moveHistory: (Participant | null)[] = ['x', 'o', 'o', 'o', 'o', 'x', 'x', 'x', 'x'];
    const winner = checkWinner(moveHistory);

    expect(winner).toBe('x');
  });

  it('returns null if there is no winner', () => {
    const moveHistory: (Participant | null)[] = ['x', 'o', null, null, null, null, null, null, null];
    const winner = checkWinner(moveHistory);

    expect(winner).toBeNull();
  });
});
