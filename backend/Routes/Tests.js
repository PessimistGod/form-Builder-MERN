const express = require('express');
const router = express.Router();
const { Test } = require('../Models/Tests');

// POST endpoint to create a test
router.post('/', async (req, res) => {
  try {
    // Create a new test instance using the Test model
    const newTest = new Test(req.body);

    // Save the test to the database
    const createdTest = await newTest.save();

    res.status(201).json(createdTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the test.' });
  }
});

module.exports = router;
