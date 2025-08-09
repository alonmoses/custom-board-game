import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Customize() {
  const [theme, setTheme] = useState("");
  const [characters, setCharacters] = useState(["", "", "", ""]);
  const router = useRouter();

  const handleGenerate = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generate",
        {
          theme,
          characters,
        }
      );
      // Store generated data in localStorage so it can be retrieved on the preview page
      localStorage.setItem("gameData", response.data.result);
      router.push("/preview");
    } catch (error) {
      console.error("Error generating game:", error);
      alert("There was an error generating your game. Please try again.");
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Customize Your Game</h1>
      <input
        className="border p-2 w-full mb-4"
        placeholder="Theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      />
      {characters.map((char, index) => (
        <input
          key={index}
          className="border p-2 w-full mb-2"
          placeholder={`Character ${index + 1}`}
          value={char}
          onChange={(e) => {
            const newChars = [...characters];
            newChars[index] = e.target.value;
            setCharacters(newChars);
          }}
        />
      ))}
      <button
        onClick={handleGenerate}
        className="mt-4 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Generate My Game
      </button>
    </div>
  );
}
