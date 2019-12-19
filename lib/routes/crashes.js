const { Router } = require('express');
const Crash = require('../models/Crash');

module.exports = Router()
  .post('/', (req, res, next) => {
    Crash
      .create(req.body)
      .then(crash => res.send(crash))
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
