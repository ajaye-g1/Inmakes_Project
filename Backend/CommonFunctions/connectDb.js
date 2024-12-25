const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017'; // MongoDB connection URL

async function connectToDatabase() {
  try {
    const client = new MongoClient(url); // Create a new MongoClient
    await client.connect(); // Connect to MongoDB
    return client; // Return the connected client
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
}

module.exports = {
  connectToDatabase,
};