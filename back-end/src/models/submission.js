const { Schema, model } = require('mongoose');

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true,
    enum: [
      'India',
      'Africa',
      'Europe'
    ]
  },
  travellerCount: {
    type: Number,
    required: true
  },
  budgetPerPerson: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

const Submission = model('Submission', schema);

module.exports = Submission;