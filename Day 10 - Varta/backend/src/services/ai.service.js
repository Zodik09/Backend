const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function askAI(question) {
    const answer = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
    });
    return answer.text;
}

async function generateVector(chats) {
    const vector = await ai.models.embedContent({
        model: 'gemini-embedding-001',
        contents: chats,
        config: {
            outputDimensionality: 768
        }
    });

    return vector.embeddings[0].values;
}

module.exports = { askAI, generateVector };