const UserModel = require('../../database/models/user.model');
const bcrypt = require('bcrypt');

const router = require('express').Router();

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new UserModel({
    name,
    email,
    password:bcrypt.hashSync(password,8)
  });
  newUser.save((err, user) => {
    if (err) {
      console.log(err);
      if (err.code === 11000) {
        res.status(400).json('Email déjà utilisé');
      } else {
        res.status(400).json('Oops une erreur est survenue');
      }
    } else {
      res.json(user);
    }
  });
});

module.exports = router;