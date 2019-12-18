const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  eventDescriptor: {
    type: String,
  },
  crashDescriptor: {
    type: String,
  },
  lightingCondition: {
    type: String,
  },
  numberOfVehiclesInvolved: {
    type: Number,
  }
})
    ;

module.exports = mongoose.model('Crash', schema);
