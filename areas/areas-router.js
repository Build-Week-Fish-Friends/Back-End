const router = require('express').Router();

const Areas = require('./areas-model.js');

const restricted = require('../auth/restriction.js');

router.get('/', restricted, (req, res) => {
  Areas.find()
    .then(areas => {
      res.status(200).json(areas);
    })
    .catch(err => res.send(err));
});

router.get('/:id', restricted, (req, res) => {
  const id = req.params.id;
  if (!id) {
    res.status(404).json({ message: "The area with the specified id does not exist." });
  } else {
    Areas.findById(id)
    .then(area => {
      res.status(201).json(area)
    })
    .catch(err => {
      res.status(500).json({ message: 'The area information could not be retrieved.' });
    })
  }
});

module.exports = router;