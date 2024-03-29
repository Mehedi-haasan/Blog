const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');

const app = express();


const schema = require('./schema/schema');
const testSchema = require('./schema/testSchema');

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://127.0.0.1:27017/blog").then(() => {
    console.log('Connected to MongoDB Atlas');
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error);
});

// Middleware for '/graphql' endpoint
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema // Here you provide your main schema
}));

// Middleware for '/test' endpoint
app.use('/test', graphqlHTTP({
    graphiql: true,
    schema: testSchema // Here you provide your test schema
}));

// Start the server
app.listen(4000, () => {
    console.log('Server is running at port 4000');
});
