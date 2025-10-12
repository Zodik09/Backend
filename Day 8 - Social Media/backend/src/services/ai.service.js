const { GoogleGenAI } = require("@google/genai");
require("@dotenvx/dotenvx").config();

const ai = new GoogleGenAI({});

const generateCaption = async (base64ImageFile) => {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: base64ImageFile,
      },
    },
    {
      text: "Caption this image.",
    },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction: `
      You are a professional social media manager.
      Add humor and creativity in the captions.
      You generate catchy and precise captions for images.
      Keep the captions in single lined.
      Also use the emojis and hashtags in the captions.
      Make sure the captions are relevant to the image.
      `,
    },
  });
  return response.text;
};

module.exports = generateCaption;
