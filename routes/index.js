const router = require('express').Router();

const userRoutes = require('./users');

const cardRoutes = require('./cards');

const {
  ERROR_NOT_FOUND,
} = require('../utils/utils');

router.get('/', (req, res) => {
  res.send('hello!');
});
router.use(userRoutes);
router.use(cardRoutes);
router.use('*', (req, res) => res.status(ERROR_NOT_FOUND).send({ message: 'Page not found' }));
module.exports = router;
