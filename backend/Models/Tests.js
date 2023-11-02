const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  formTitle: String,
  categories: [
    {
      title: String,
      items: [String],
    },
  ],
});

const clozeQuestionSchema = new mongoose.Schema({
  description: String,
  preview: String,
  options: [String],
});

const comprehensionQuestionSchema = new mongoose.Schema({
  queType: String,
  inputValue: String,
  textType: String,
  options: [String],
  correctOptions: [Number],
  points: Number,
  text: String,
});

const testSchema = new mongoose.Schema({
  testName: {type:String,unique:true,required:true},
  imageURL:String,
  categories: [categorySchema],
  clozeQuestions: [clozeQuestionSchema],
  comprehensionQuestions: [[comprehensionQuestionSchema]],
  SectionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
  },

});

mongoose.models ={}

const TestModel = mongoose.model('Test', testSchema);

module.exports = TestModel;
