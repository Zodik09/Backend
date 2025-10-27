const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function askAI(question) {
    const answer = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
    });
    return answer.text;
}

module.exports = askAI;