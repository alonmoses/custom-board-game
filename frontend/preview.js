import { useEffect, useState } from "react";

export default function Preview() {
  const [gameData, setGameData] = useState("");

  useEffect(() => {
    // Retrieve the stored game data from localStorage
    const stored = localStorage.getItem("gameData");
    if (stored) {
      setGameData(stored);
    }
  }, []);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Custom Game</h1>
      {gameData ? (
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
          {gameData}
        </pre>
      ) : (
        <p>No game data found. Please generate a game first.</p>
      )}
    </div>
  );
}
