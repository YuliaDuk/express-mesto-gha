const router = require('express').Router();

const {
  getUsers, getUserById, createUser, updateUser, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/:userId', getUserById);

router.post('/users', createUser);

router.patch('/users/me', updateUser);

router.patch('/users/me/avatar', updateAvatar);

// router.patch('/users/:userId', updateUserById);

// router.delete('/users/:userId', deleteUserById);

module.exports = router;
