const express = require('express');
const router = express.Router();
const Section = require('../Models/Sections');

// Get all sections
router.get('/', (req, res) => {
  Section.find()
    .then((sections) => {
      res.json(sections);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
});

// Create a new section
router.post('/', (req, res) => {
  const { name } = req.body;
  const newSection = new Section({ name });

  newSection
    .save()
    .then((section) => {
      res.json(section);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
});

// Delete a section by ID
router.delete('/:id', (req, res) => {
  const sectionId = req.params.id;

  Section.findByIdAndRemove(sectionId)
    .then((section) => {
      if (!section) {
        return res.status(404).json({ message: 'Section not found' });
      }
      res.json({ message: 'Section deleted' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    });
});

module.exports = router;
