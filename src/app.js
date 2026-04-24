const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

// Basic route for testing
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running!' });
});

// POST /bfhl route (placeholder)
app.post('/bfhl', (req, res) => {
  try {
    // Placeholder response
    res.json({
      user_id: 'john_doe_17091999',
      email_id: 'john@xyz.com',
      college_roll_number: 'ABCD123',
      hierarchies: [],
      invalid_entries: [],
      duplicate_edges: [],
      summary: {
        total_trees: 0,
        total_cycles: 0,
        largest_tree_root: null
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = app;