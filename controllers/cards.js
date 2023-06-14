const Card = require('../models/card');

const ERROR_VALIDATION = 400;

const ERROR_NOT_FOUND = 404;

const ERROR_SERVER = 500;

const createCard = (req, res) => {
  const { name, link } = req.body;
  Card
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_VALIDATION).send({ message: 'Validation Error' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Server Error' });
    });
};

const getCards = (req, res) => {
  Card
    .find({})
    .then((card) => res.send({ data: card }))
    .catch(() => res.status(ERROR_SERVER).send({ message: 'Server Error' }));
};

const deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card
    .findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Card not found' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Validation Error' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Server Error' });
    });
};

const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Card not found' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Validation Error' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Server Error' });
    });
};

const dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((card) => {
      if (!card) {
        res.status(ERROR_NOT_FOUND).send({ message: 'Card not found' });
        return;
      }
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_VALIDATION).send({ message: 'Validation Error' });
        return;
      }
      res.status(ERROR_SERVER).send({ message: 'Server Error' });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
};
