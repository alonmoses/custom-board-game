/**
 * This Express router defines the /api/generate endpoint.
 * It accepts a theme and a list of character names, uses OpenAI to
 * generate custom board game content based on the 'Race to 10 Points'
 * base rules, and returns the resulting rulebook and card descriptions.
 *
 * The OpenAI call is optional: if the OPENAI_API_KEY is not set, a
 * stubbed response is returned so you can test locally without network access.
 */

import express from 'express';
import OpenAI from 'openai';

const router = express.Router();

// Initialize the OpenAI client with your API key. This client will send
// requests to OpenAI's service to generate content.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Helper function to build the prompt string for the AI.
 * It includes the theme and the names of the characters.
 */
function buildPrompt(theme, characters) {
  const names = (characters || []).join(', ');
  return `
Create a custom board game using the 'Race to 10 Points' base rules.
Theme: ${theme}
Characters: ${names}

Return the following sections with concise, printable content:

Rulebook (themed) - Objective, Setup, Turn structure, Interaction, End of round, Winning.
Challenge Cards (at least 20) - Each with name, costs, difficulty, reward.
Action Cards (at least 15) - Mix of stealing, blocking, boosts, trades.
Event Cards (10–15) - Round-wide effects.

Only change the flavour names; keep the core mechanics the same.
  `.trim();
}

/**
 * POST /api/generate
 * Request body should include:
 *  - theme: The theme for the game
 *  - characters: An array of character names
 *
 * The endpoint returns generated game content or a fallback stub.
 */
router.post('/', async (req, res) => {
  // Extract the theme and list of character names from the JSON body of the request
  const { theme, characters = [] } = req.body;

  // Build a prompt string that instructs the AI to create a custom board game
  const prompt = buildPrompt(theme, characters);

  try {
    // If an API key is present, call the OpenAI API to generate content.
    if (process.env.OPENAI_API_KEY) {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.8,
      });
              // Extract the AI's response content; fallback to an empty string if undefined
      const content = completion.choices?.[0]?.message?.content ?? '';
      return res.json({ result: content });
    }

    // Fallback stub if no API key provided: simple example content
    const fallback = [
      `# Custom Board Game`,
      `Theme: ${theme}`,
      `Characters: ${characters.join(', ')}`,
      '',
      '## Rulebook',
      `Use the 'Race to 10 Points' rules. Each player competes to collect 10 points first.`,
      '',
      '## Challenge Cards',
      '- Example challenge: Collect resources and roll a die.',
      '',
      '## Action Cards',
      '- Example action: Steal a resource.',
      '',
      '## Event Cards',
      '- Example event: All players gain a resource.',
    ].join('\n');
        // Return the fallback sample content to the client as JSON
    return res.json({ result: fallback });
  } catch (err) {
    // If an error occurs with the API call or processing, log the error and return an error response
    console.error(err);
    return res.status(500).json({ error: 'Error generating game content' });
  }
});

export default router;
