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


router.get('/user/:id', (req, res) => {
  const user_id = req.params.id;
  // res.status(200).json({ user_id: user_id });
  if (!user_id) {
    res.status(400).json({ message: 'This user does not seem to exist' });
  } else {
    Logs.findBy({ user_id })
      .then(logs => {
        res.status(201).json(logs)
      })
      .catch(err => {
        res.status(500).json({ message: 'The users logs could not be retrieved' })
      })
  }
})



router.get('/area/:id', (req, res) => {
  const area_id = req.params.id;
  // res.status(200).json({ area_id: area_id });
  if (!area_id) {
    res.status(400).json({ message: 'This area does not seem to exist' });
  } else {
    Logs.findBy({ area_id })
      .then(logs => {
        res.status(201).json(logs)
      })
      .catch(err => {
        res.status(500).json({ message: 'The areas logs could not be retrieved' })
      })
  }
})

router.post('/', (req, res) => {
  let log = req.body;

    Logs.add(log)
      .then(saved => {
        res.status(201).json(saved);
      })
      .catch(error => {
        res.status(500).json(error);
      })
})


router.put('/:id', (req, res) => {
  
  const { id } = req.params;
  const changes = req.body;

  Logs.findById(id)
    .then(log => {
      if (log) {
        Logs.update(id, changes)
          .then(updatedLog => {
            res.status(200).json(updatedLog);
          });
      } else {
        res.status(404).json({ message: 'Could not find log with the given id'});
      }
    })
    .catch(err => {
      res.status(500).json({ 
        message: 'Failed to update log',
      });
    })
})


// TODO remove(id) - returns number of logs removed
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  Logs.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find log with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete log' });
    })
})



module.exports = router;