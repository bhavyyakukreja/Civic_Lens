const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require('dotenv');
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getAIResponse = async (message) => {
  console.log("inside services");
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  console.log("model created")
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
  console.log(process.env.GEMINI_API_KEY)
  const result = await model.generateContent({prompt});
  console.log("result received")
  const response = await result.response;
  console.log("returning from services")
  return response.text();
};

module.exports = { getAIResponse };