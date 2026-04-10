require("dotenv").config();

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function test() {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: "Hello" }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    console.log("FULL:", data);

    console.log("✅ TEXT:", data.candidates?.[0]?.content?.parts?.[0]?.text);

  } catch (err) {
    console.error("❌ ERROR:", err);
  }
}
