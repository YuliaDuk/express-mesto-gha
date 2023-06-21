const router = require('express').Router();

const userRoutes = require('./users');

const cardRoutes = require('./cards');

const NotFoundError = require('../errors/NotFoundError');

router.get('/', (req, res) => {
  res.send('hello!');
});
router.use(userRoutes);
router.use(cardRoutes);
router.use('*', () => {
  throw new NotFoundError('Такая страница не существует');
});
module.exports = router;
