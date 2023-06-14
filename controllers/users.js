const User = require('../models/user');

const {
  ERROR_VALIDATION,
  ERROR_NOT_FOUND,
  ERROR_SERVER,
  STATUS_OK,
} = require('../utils/utils');

const getUsers = (req, res) => {
  User
    .find({})
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Server Error' }));
};

const getUserById = (req, res) => {
  const { userId } = req.params;
  User
    .findById(userId)
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'User not found' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Validation Error' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Server Error' });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User
    .create({ name, about, avatar })
    .then((user) => res.status(STATUS_OK).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Validation Error' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Server Error' });
    });
};

const updateUser = (req, res) => {
  const { name, about } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    )
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'User not found' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_VALIDATION).send({ message: 'Validation Error' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Server Error' });
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User
    .findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    )
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: 'User not found' });
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(ERROR_VALIDATION).send({ message: 'Validation Error' });
      }
      return res.status(ERROR_SERVER).send({ message: 'Server Error' });
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
};
