const router = require('express').Router();

const Logs = require('./log-model.js');

const restricted = require('../auth/restriction.js');

router.get('/', restricted, (req, res) => {
  Logs.find()
    .then(logs => {
      res.status(200).json(logs);
    })
    .catch(err => res.send(err));
});

router.get('/:id', restricted, (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The log with the specified id does not exist." });
  } else {
    Logs.findById(id)
    .then(log => {
      res.status(201).json(log)
    })
    .catch(err => {
      res.status(500).json({ message: 'The log information could not be retrieved.' });
    })
  }
});

module.exports = router;