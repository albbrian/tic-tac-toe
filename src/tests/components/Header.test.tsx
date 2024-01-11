import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Header from '../../components/Header';

describe('Header', () => {
  it('renders the game mode message', () => {
    const { getByText } = render(<Header gameMode="pvc" isCrossNext winner={null} isDraw={false} onClickPlayAgain={() => {}} />);
    expect(getByText(/Game mode: pvc/)).toBeInTheDocument();
  });

  it('renders the turn message correctly for cross', () => {
    const { getByTestId } = render(<Header gameMode="pvp" isCrossNext winner={null} isDraw={false} onClickPlayAgain={() => {}} />);
    expect(getByTestId('header-message')).toHaveTextContent("This is Cross's turn");
  });

  it('renders the turn message correctly for circle', () => {
    const { getByTestId } = render(<Header gameMode="pvp" isCrossNext={false} winner={null} isDraw={false} onClickPlayAgain={() => {}} />);
    expect(getByTestId('header-message')).toHaveTextContent("This is Circle's turn");
  });

  it('renders the winner message when Cross is a winner', () => {
    const { getByTestId } = render(<Header gameMode="pvp" isCrossNext winner="x" isDraw={false} onClickPlayAgain={() => {}} />);
    expect(getByTestId('header-message')).toHaveTextContent('Congratulation! Winner is Cross.');
  });

  it('renders the winner message when Circle is a winner', () => {
    const { getByTestId } = render(<Header gameMode="pvp" isCrossNext winner="o" isDraw={false} onClickPlayAgain={() => {}} />);
    expect(getByTestId('header-message')).toHaveTextContent('Congratulation! Winner is Circle.');
  });

  it('renders the draw message when the game is a draw', () => {
    const { getByTestId } = render(<Header gameMode="pvp" isCrossNext winner={null} isDraw onClickPlayAgain={() => {}} />);
    expect(getByTestId('header-message')).toHaveTextContent('This is a draw.');
  });

  it('calls the onClickPlayAgain function when the Play Again button is clicked', () => {
    const onClickPlayAgain = jest.fn();
    const { getByText } = render(<Header gameMode="pvp" isCrossNext winner="x" isDraw={false} onClickPlayAgain={onClickPlayAgain} />);
    fireEvent.click(getByText('Play Again'));
    expect(onClickPlayAgain).toHaveBeenCalled();
  });

  it('renders the "Play Again" button when there is a winner', () => {
    const { getByText } = render(<Header gameMode="pvp" isCrossNext winner="x" isDraw={false} onClickPlayAgain={() => {}} />);
    expect(getByText('Play Again')).toBeInTheDocument();
  });

  it('renders the "Play Again" button when the game is a draw', () => {
    const { getByText } = render(<Header gameMode="pvp" isCrossNext winner={null} isDraw onClickPlayAgain={() => {}} />);
    expect(getByText('Play Again')).toBeInTheDocument();
  });
});
