const express = require('express');
const router = express.Router();
const Users = require('../database/models/db-models');
const bcrypt = require('bcryptjs');
const authenticate = require('./authenticate-middleware');
const validate = require('./validate-middleware');
const generateToken = require('./token-middleware');


router.use(express.json());

router.post('/register', (req, res) => {
  const credentials = req.body;
  const hash = bcrypt.hashSync(credentials.password, 14);

  credentials.password = hash

  Users.add(credentials)
  .then( () => {
      res.status(201).json({ hash })
      //res.status(200).send('message')
  })
  .catch(error => {
      res.status(500).json(error.message);
  });
});

router.post('/login', validate, (req, res) => {
  const token = generateToken(req.body)
  res.status(200).json({ message: `Welcome ${req.body.username}`, token})
  //res.status(201).send('message')
});

router.get('/users', authenticate, (req, res) => {
  Users.find()
  .then(users => {
      res.status(200).json({ users })
  })
})

module.exports = router;
