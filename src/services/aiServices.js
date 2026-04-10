require("dotenv").config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getAIResponse = async (message) => {
  console.log("inside services");

  const prompt = `
You are a legal awareness assistant for Indian citizens.

Rules:
- Identify situation
- Mention rights and laws
- Suggest actions
- Keep it simple
- No legal advice
- Add disclaimer

Format:
Situation:
Rights:
Law:
Actions:
Disclaimer:

User input: ${message}
`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("FULL RESPONSE:", data);

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("No response text from Gemini");
    }

    console.log("returning from services");

    return text;

  } catch (error) {
    console.error("❌ ERROR in getAIResponse:", error);
    return "Error generating response. Please try again.";
  }
};

module.exports = { getAIResponse };