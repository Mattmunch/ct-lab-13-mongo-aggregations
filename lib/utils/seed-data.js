const csv = require('csvToJson');
const Crash = require('../models/Crash');

function seedData() {
  return csv()
    .fromFile(__dirname + '/../csv/crashData.csv')
    .then(crashes => {
      return crashes.map(crash => ({
        eventDescriptor: crash['Event Descriptor'],
        crashDescriptor: crash['Crash Descriptor'],
        lightingConditions: crash['Lighting Conditions'],
        numberOfVehiclesInvolved: crash['Number of Vehicles Involved']
      }));
    })
    .then(crashes => Crash.create(crashes.slice(101, 150000)));
}
module.exports = { seedData }
;
