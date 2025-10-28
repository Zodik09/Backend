// Import the Pinecone library
const { Pinecone } = require('@pinecone-database/pinecone');

// Initialize a Pinecone client with your API key
const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const indexName = 'varta';

// Target the index
const index = pc.index(indexName)

const createMemory = async ({ vectors, messageId, metadata }) => {
    // Create a dense index with integrated embedding
    await index.upsert([{ values: vectors, id: messageId, metadata }]);
}

const queryMemory = async ({ queryVector, limit = 5, metadata }) => {

    const data = await index.query({
        vector: queryVector,
        topK: limit,
        filter: metadata ? { metadata } : undefined,
        includeMetadata: true
    })
    return data.matches
}

module.exports = { createMemory, queryMemory };