const User = require('../../models/user');
const bcrypt = require('bcrypt');

const setUser = (req, res) => {
  const { email, password } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  const user = new User({ email, password: passwordHash });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        msg: 'set user succeeded',
        result,
      });
    })
    .catch((err) => {
      res.status(400).json({
        msg: 'set user failed',
        err,
      });
    });
};

const searchUser = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          res.status(200).json({
            msg: 'login succeeded',
            userId: user._id,
          });
        } else {
          res.status(401).json({
            msg: 'invalid credentials',
          });
        }
      } else {
        res.status(404).json({
          msg: 'user not found',
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        msg: 'search user error',
        err,
      });
    });
};

module.exports = {
  setUser,
  searchUser,
};
