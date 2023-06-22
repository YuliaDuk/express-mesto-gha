const Card = require('../models/card');

const STATUS_OK = 201;

const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.status(STATUS_OK).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Заполните обязательные поля'));
      }
      return next(err);
    });
};

const getCards = (req, res, next) => {
  Card
    .find({})
    .then((card) => res.send({ data: card }))
    .catch(next);
};

const deleteCardById = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует');
      }
      if (card.owner.toString() === req.user._id) {
        Card.findByIdAndRemove(cardId)
          .then((user) => res.send({ data: user }))
          .catch(next);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new ValidationError('Некорректный id'));
      }
      return next(err);
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params.cardId;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует!');
      }
      return Card
        .findByIdAndUpdate(
          cardId,
          { $addToSet: { likes: req.user._id } },
          { new: true },
        )
        .then((newcard) => {
          res.status(STATUS_OK).send({ data: newcard });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new ValidationError('Некорректный id'));
          }
          return next(err);
        });
    })
    .catch(next);
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params.cardId;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Такой карточки не существует!');
      }
      return Card
        .findByIdAndUpdate(
          cardId,
          { $pull: { likes: req.user._id } },
          { new: true },
        )
        .then((newcard) => {
          res.status(STATUS_OK).send({ data: newcard });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            return next(new ValidationError('Некорректный id'));
          }
          return next(err);
        });
    })
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
