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
schema.statics.getDeerAccidentTotal = function() {
  return this.aggregate([
    {
      '$match': {
        'eventDescriptor': 'Deer'
      }
    }, {
      '$count': 'deerHit'
    }
  ]);
};
schema.statics.numberOfPedsHitLightingConditions = function() {
  return this.aggregate([
    {
      '$match': {
        'eventDescriptor': 'Pedestrian, Collision With'
      }
    }, {
      '$group': {
        '_id': '$lightingCondition', 
        'count': {
          '$sum': 1
        }
      }
    }, {
      '$project': {
        'eventDescriptor': 1, 
        'count': 1, 
        'crashDescriptor': 1
      }
    }
  ]);
};

module.exports = mongoose.model('Crash', schema);
