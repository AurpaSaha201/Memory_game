"use client";

import { useState } from "react";
const GRID_SIZE = 4;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

export default function MemoryMatrixGame() {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [activeCell, setActiveCell] = useState(null);//highlight houa cell
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameState, setGameState] = useState("idle");
  

  const startGame = (currentLevel) => {
    const newSequence = []; 
    const sequenceLength = currentLevel + 0;
    for (let i = 0; i < sequenceLength; i++) {
      const randomCell = Math.floor(Math.random() * TOTAL_CELLS);
      newSequence.push(randomCell);
    }

    setSequence(newSequence);
    setUserSequence([]);
    setGameState("memorize");

  
    newSequence.forEach((cell, index) => {
      setTimeout(() => {
        setActiveCell(cell);

        setTimeout(() => {
          setActiveCell(null);
        }, 300);//cell heilight houar 300ms por off hobe
      }, index * 600);//0 ,600,1200ms por heilight hobe
    });

    // pattern por player turn
    setTimeout(() => {
      setGameState("playing");
    }, sequenceLength * 600);
  };


  const handleCellClick = (index) => {
    if (gameState !== "playing") {
      return;
    }

    const currentIndex = userSequence.length;

    //5==5
    if (sequence[currentIndex] === index) {
      const newUserSequence = [...userSequence, index];//5,10,2

      setUserSequence(newUserSequence);

      //pura pattern alright
      if (newUserSequence.length === sequence.length) {
        const newScore = score + level * 50;

        setScore(newScore);
        setGameState("won");
      }
    } else {
      // wrong lives decrease
      const newLives = lives - 1;

      setLives(newLives);

      if (newLives === 0) {
        setGameState("gameover");
      } else {
        setGameState("lost");
      }
    }
  };

  // Next level
  const nextLevel = () => {
    const newLevel = level + 1;
    setLevel(newLevel);
    startGame(newLevel);
  };

  // Same level again try
  const tryAgain = () => {
    startGame(level);
  };

  // Game again start
  const restartGame = () => {
    setLevel(1);
    setScore(0);
    setLives(3);
    startGame(1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-cyan-400"> MEMORY MATRIX</h1>
      <p className="text-slate-400 mt-2"> Pattern memorize!</p>

      <div className="flex gap-5 my-5">
        <p>Level: {level}</p>
        <p>Score: {score}</p>
        <p>Lives: {"❤️".repeat(lives)}</p>
      </div>

     
      <div className="grid grid-cols-4 gap-3">
        {Array.from({ length: TOTAL_CELLS }).map((_, index) => {
          const isActive = activeCell === index;

          return (
            <button key={index}
              onClick={() => handleCellClick(index)}disabled={gameState !== "playing"}
              className={` w-16 h-16 rounded-lg border
                ${
                  isActive
                    ? "bg-cyan-400 border-cyan-200"
                    : "bg-slate-800 border-slate-700"
                }
              `}
            >
            </button>
          );
        })}

      </div>

  
      {gameState === "idle" && (
        <button onClick={() => startGame(1)}  className="mt-6 px-6 py-3 bg-cyan-600 rounded-lg">  Start Game</button>
      )}

      {gameState === "memorize" && (<p className="mt-6 text-yellow-400"> 👀 Pattern see... </p>
      )}

      {gameState === "playing" && (<p className="mt-6 text-cyan-400">⚡ now  your turn!</p>
      )}

     
      {gameState === "won" && (
        <div className="mt-6 text-center">
          <p className="text-green-400 text-xl">🎉 Level Complete! </p>

          <button onClick={nextLevel}  className="mt-3 px-6 py-3 bg-green-600 rounded-lg" > Next Level</button>

        </div>
      )}


      {gameState === "lost" && ( <div className="mt-6 text-center">
          <p className="text-red-400">❌ Wrong!one lives gone। </p>

          <button onClick={tryAgain}  className="mt-3 px-6 py-3 bg-yellow-600 rounded-lg">Try Again</button>
        </div>
      )}

      {gameState === "gameover" && (<div className="mt-6 text-center">
          <p className="text-red-500 text-xl"> 💀 Game Over</p>
          <p className="mt-2"> Final Score: {score} </p>
          <button onClick={restartGame} className="mt-3 px-6 py-3 bg-cyan-600 rounded-lg"> Restart </button>
        </div>
      )}

    </div>
  );
}
