const { GoogleGenAI } = require("@google/genai");
require("@dotenvx/dotenvx").config();

const ai = new GoogleGenAI({});

async function askAI(chatHistory) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: chatHistory,
  });
  return response.text;
}

module.exports = askAI;
