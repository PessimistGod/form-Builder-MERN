const mongoose = require('mongoose');

// Define the Main Data schema
const userResponseSchema = new  mongoose.Schema({
  userName: String,
  userEmail: String,
  userCategoryData: Array, 
  combinedClozeValues: Array,
  comprehensionResponses: Array,
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestModel'
  },
});


mongoose.models ={}

const UserResponse = mongoose.model('UserResponses', userResponseSchema);

module.exports = UserResponse;
