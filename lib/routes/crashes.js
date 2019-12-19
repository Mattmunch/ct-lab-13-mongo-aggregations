const { Router } = require('express');
const Crash = require('../models/Crash');

module.exports = Router()
  .get('/', (req, res, next) => {
    const { page = 1, perPage = 25 } = req.query;
    Crash
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(crashes => res.send(crashes))
      .catch(next);
  })
  .post('/', (req, res, next) => {
    Crash
      .create(req.body)
      .then(crash => res.send(crash))
      .catch(next);
  })
  .get('/deerAccidentTotal', (req, res, next) => {
    Crash
      .getDeerAccidentTotal()
      .then(crashes => res.send(crashes))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Crash
      .findById(req.params.id)
      .then(crash => res.send(crash))
      .catch(next);
  })
  .patch('/:id', (req, res, next) => {
    Crash
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(crash => res.send(crash))
      .catch(next);
  })
;
