const express = require('express');
const router = express.Router();
const TestModel = require('../Models/Tests'); // Adjust the path as needed

// POST endpoint to create a test
router.post('/', async (req, res) => {
  try {
    const newTest = new TestModel(req.body);


    const createdTest = await newTest.save();

    res.status(201).json(createdTest);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create the test.' });
  }
});

router.get('/:testId', async (req, res) => {
  try {
    const { testId } = req.params;

    // Fetch the test data based on the testId
    const testData = await TestModel.findById(testId).exec();

    if (!testData) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.json(testData);
  } catch (error) {
    console.error('Error fetching test data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const tests = await TestModel.find({});
    res.status(200).json(tests);
  } catch (error) {
    // Handle errors, e.g., send an error response
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve test models' });
  }
});

router.get('/:testId', (req, res) => {
  const { testId } = req.params;
  const test = mockTestDatabase[testId];
  if (test) {
    res.json(test);
  } else {
    res.status(404).json({ error: 'Test not found' });
  }
});

module.exports = router;
