const { GoogleGenAI } = require("@google/genai");
require("@dotenvx/dotenvx").config();

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function main(url) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Write a single caption for the given image: " + url + ". Don't give the multiple choices. Make it catchy and relevant to social media."
  });
  return response.text
}

module.exports = main;
