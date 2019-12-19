require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Crash = require('../lib/models/Crash');

describe('app routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });
  
  let crash;
  beforeEach(async() => {
    crash = await Crash.create({
      eventDescriptor:'Deer',
      crashDescriptor:'Things happened',
      lightingCondition:'Broad Daylight',
      numberOfVehiclesInvolved:99,
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });
  it('can create a crash', () => {
    return request(app)
      .post('/api/v1/crashes')
      .send({
        eventDescriptor:'Deer',
        crashDescriptor:'Things happened',
        lightingCondition:'Broad Daylight',
        numberOfVehiclesInvolved:99,
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          eventDescriptor:'Deer',
          crashDescriptor:'Things happened',
          lightingCondition:'Broad Daylight',
          numberOfVehiclesInvolved: 99,
          __v:0
        });
      });
  });
  it('can get a crash by id', () => {
    return request(app)
      .get(`/api/v1/crashes/${crash.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: crash.id,
          eventDescriptor:'Deer',
          crashDescriptor:'Things happened',
          lightingCondition:'Broad Daylight',
          numberOfVehiclesInvolved: 99,
          __v:0
        });
      });
  });
  it('can update a crash', () => {
    return request(app)
      .patch(`/api/v1/crashes/${crash.id}`)
      .send({ eventDescriptor: 'Gorilla' })
      .then(res => {
        expect(res.body).toEqual({
          _id: crash.id,
          eventDescriptor:'Gorilla',
          crashDescriptor:'Things happened',
          lightingCondition:'Broad Daylight',
          numberOfVehiclesInvolved: 99,
          __v:0
        })
      });
  });

});
