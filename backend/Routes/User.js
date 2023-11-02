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

module.exports = router;
