// Import required modules
const express = require('express');
const AWS = require('aws-sdk');

// Set up AWS SDK with local DynamoDB endpoint
AWS.config.update({
  region: 'us-west-2', // Change this to your desired region
  endpoint: 'http://localhost:8000' // Endpoint for DynamoDB local
});

// Create a new DynamoDB DocumentClient
const docClient = new AWS.DynamoDB.DocumentClient();

// Create an Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// GET route to fetch data from DynamoDB
app.get('/students', (req, res) => {
  const params = {
    TableName: 'Student' // Change this to your DynamoDB table name
  };

  // Scan DynamoDB table to retrieve all items
  docClient.scan(params, (err, data) => {
    if (err) {
      console.error('Unable to scan the table. Error:', JSON.stringify(err, null, 2));
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Scan succeeded. Data:', data);
      res.json(data.Items); // Send retrieved items as JSON response
    }
  });
});

// POST route to add data to DynamoDB
app.post('/students', (req, res) => {
  const { id, name, city, address, image, role } = req.body;

  const params = {
    TableName: 'Student', // Change this to your DynamoDB table name
    Item: { id, name, city, address, image, role } // Item to be inserted into DynamoDB
  };

  // Put item into DynamoDB table
  docClient.put(params, (err, data) => {
    if (err) {
      console.error('Unable to put item to the table. Error:', JSON.stringify(err, null, 2));
      res.status(500).send('Internal Server Error');
    } else {
      console.log('PutItem succeeded:', JSON.stringify(data, null, 2));
      res.status(201).send('Item created successfully');
    }
  });
});

// Start the Express server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
