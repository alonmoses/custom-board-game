import express from "express";
import   OpenAI from "openai";

const router = express.Router();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * POST /api/generate
 * Request body should include:
 * - theme: The theme for the game
 * - characters: An array of character names
 *
 * The endpoint returns generated game content, including a rulebook,
 * challenge deck, action deck, and event deck customized to the theme.
 */
router.post("/", async (req, res) => {
  const { theme, characters } = req.body;
  // Compose a prompt to instruct the AI about what to generate
  const prompt = `Create a custom board game based on the theme "${theme}" with characters: ${characters.join(", ")}. Use the 'Race to 10 Points' base rules. Output themed rulebook text, challenge cards, action cards, and event cards.`;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.8,
    });
    const content = completion.choices[0]?.message?.content || "";
    res.json({ result: content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating game content" });
  }
});

export default router;
