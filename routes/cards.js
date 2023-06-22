const router = require('express').Router();

const { celebrate, Joi } = require('celebrate');

const {
  getCards, createCard, deleteCardById, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/cards', getCards);

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line no-useless-escape
    link: Joi.string().required().min(2).pattern(/^https?:\/\/[\w\-\.\/~:\?\#\[\]@!$&'\(\)\*\+,;=]+#?$/),
  }),
}), createCard);

router.delete('/cards/:cardId', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), deleteCardById);
router.put('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), likeCard);
router.delete('/cards/:cardId/likes', celebrate({
  body: Joi.object().keys({
    userId: Joi.string().required().length(24),
  }),
}), dislikeCard);

module.exports = router;
