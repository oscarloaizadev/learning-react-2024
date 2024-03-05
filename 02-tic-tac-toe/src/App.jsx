import "./App.css";
import confetti from "canvas-confetti";
import { useEffect, useState } from "react";

// Components
import { Square } from "./components/Square";
import { WinnerModal } from "./components/WinnerModal";
import { Board } from "./components/Board";

// Constants
import { TURNS } from "./constants.js";

// Logic
import { checkWinnerFrom, checkEndGame } from "./logic/board.js";
import { saveGameToStorage, resetGameFromStorage } from "./logic/storage/index.js";

export default function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? JSON.parse(turnFromStorage) : TURNS.X;
  });
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);
    resetGameFromStorage();
  };

  const updateBoard = (index) => {
    if (board[index] || winner) return;
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setWinner(newWinner);
      resetGameFromStorage();
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }
  };

  useEffect(() => {
    saveGameToStorage({ board, turn });
  }, [board, turn]);

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className="game">
        <Board board={board} updateBoard={updateBoard} />
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  );
}
