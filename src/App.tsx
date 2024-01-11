import React from 'react';
import './App.css';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import TicTacToe from './components/TicTacToe';
import Landing from './components/Landing';
import GameModes from './components/GameModes';

const pathName = process.env.PUBLIC_URL || '/';
console.log('🚀 ~ pathName:', pathName);

const router = createBrowserRouter([
  {
    path: '/landing',
    element: <Landing />,
  },
  {
    path: '/choose-game-mode',
    element: <GameModes />,
  },
  {
    path: '/play',
    element: <TicTacToe />,
  },
  {
    path: '/',
    element: <Navigate to="/landing" />,
  },
], { basename: pathName });

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
