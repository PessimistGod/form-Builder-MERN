const mongoose = require('mongoose');

// Schema for options
const OptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  isCorrect: {
    type: Boolean,
    default: false,
  },
});

// Schema for categories
const CategorySchema = new mongoose.Schema({
  title:{
    type : String,
    required: true
  },
  items: [
    {
      item: {
        type: String,
        required: true,
      },
      options: [OptionSchema],
    },
  ],
});

// Schema for cloze questions
const ClozeQuestionSchema = new mongoose.Schema({
  description:{
    type: String,
    required: true,
  },
  preview: {
    type: String,
    required: true,
  },
  options: [OptionSchema],
});

const ComprehensionQuestionSchema = new mongoose.Schema({
  queType: {
    type: String,
    required: true,
  },
  data: {
    image: {
      type: String,
    },
    questionText: {
      type: String,
    },
    options: [OptionSchema],
    points: {
      type: Number,
      required: true,
    },
  },
});
const TestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  categories: [CategorySchema],
  clozeQuestions: [ClozeQuestionSchema],
  comprehensionQuestions: [ComprehensionQuestionSchema],
});

// Define and export your models
const Test = mongoose.model('Test', TestSchema);

module.exports = {
  Test,
};
