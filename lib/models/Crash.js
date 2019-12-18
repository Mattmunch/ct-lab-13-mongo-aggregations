const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  eventDescriptor: {
    type: String,
    required: true
  },
  crashDescriptor: {
    type: String,
    required: true
  },
  lightingCondition: {
    type: String,
    required: true
  },
  numberOfVehiclesInvolved: {
    type: Number,
    required:true
  }
})
    ;

module.exports = mongoose.model('Crash', schema);
