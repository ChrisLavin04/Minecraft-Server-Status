// filepath: backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5050;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb+srv://s00251319:8yFWkKVm3t5W9bPz@minecraftserverdata.z8n7ber.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a Schema and Model
const serverSchema = new mongoose.Schema({
  hostname: String,
  ip: String,
  status: String,
  players: {
    online: Number,
    max: Number,
  },
});

const Server = mongoose.model('Server', serverSchema);

// API Endpoints
app.get('/servers', async (req, res) => {
  try {
    const servers = await Server.find();
    res.json(servers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.post('/servers', async (req, res) => {
  try {
    const newServer = new Server(req.body);
    await newServer.save();
    res.status(201).json(newServer);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});