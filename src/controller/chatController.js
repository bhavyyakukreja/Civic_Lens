const { getAIResponse } = require("../services/aiServices");

const handleChat = async (req, res) => {
  console.log("request recieved")
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message required" });
  }

  try {
    const aiResponse = await getAIResponse(message);
    console.log("returning form controller")
    res.json({
      reply: aiResponse
    });

  } catch (error) {
    res.status(500).json({
      error: "Something went wrong",
      fallback: "Please try again later"
    });
  }
};

module.exports = { handleChat };