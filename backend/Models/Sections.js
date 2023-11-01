const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
},{timestamps:true});

mongoose.models ={}
const Section = mongoose.model('Section', sectionSchema);

module.exports = Section;

