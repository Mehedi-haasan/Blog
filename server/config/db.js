
const { MongoClient } = require('mongodb');

// Connection URI
const uri = "mongodb+srv://mrmehedihaasan:FeCrLIY0MkLgepA1@cluster0.on7xpay.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Function to connect to the MongoDB database
async function connectToDatabase() {
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        console.log("Connected to MongoDB Atlas");

        // Access and work with the database
        const database = client.db("<your-database-name>");
        const collection = database.collection("<your-collection-name>");

        // Example: Insert a document into the collection
        await collection.insertOne({ key: "value" });

    } catch (err) {
        console.error("Error connecting to MongoDB Atlas", err);
    } finally {
        // Close the connection
        await client.close();
        console.log("Connection to MongoDB Atlas closed");
    }
}

// Call the connectToDatabase function
connectToDatabase();
