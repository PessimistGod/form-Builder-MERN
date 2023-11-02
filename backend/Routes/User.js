const express = require('express');
const router = express.Router();
const UserResponse = require('../Models/userRsponse')

router.post('/response', async (req, res) => {
    try {
      const userResponse = await UserResponse.create(req.body);
      res.status(201).json({ message: 'User response created successfully', userResponse });
    } catch (error) {
      console.error('Error creating user response:', error);
      res.status(500).json({ error: 'Failed to create user response' });
    }
  });

  router.get('/:testId', async (req, res) => {
    try {
      const { testId } = req.params;
      
      const userResponses = await UserResponse.find({ testId });
      
      res.json(userResponses);
    } catch (error) {
      console.error('Error fetching user responses:', error);
      res.status(500).json({ error: 'An error occurred while fetching user responses' });
    }
  });

  router.get('/response/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
  
      const userResponse = await UserResponse.findById(userId);
  
      if (!userResponse) {
        return res.status(404).json({ error: 'User response not found' });
      }
  
      res.json(userResponse);
    } catch (error) {
      console.error('Error fetching user response by ID:', error);
      res.status(500).json({ error: 'An error occurred while fetching user response' });
    }
  });

module.exports = router;
