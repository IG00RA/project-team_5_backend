const { ctrlWrapper, HttpError } = require("../helpers");
const { Review } = require("../models/Review");

const getAllReview = ctrlWrapper(async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json(reviews);
});

const getOwnReview = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const ownReview = await Review.findOne(owner);
  if (!ownReview) {
    throw new HttpError(404, "Review not found");
  }
  res.status(200).json(ownReview);
});

const createReview = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  console.log(req.user);
  const newReview = await Review.create({ ...req.body, owner });
  res.status(201).json(newReview);
});

const updateReview = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedReview) {
    throw new HttpError(404, "Review not found");
  }
  res.status(200).json(updatedReview);
});

const removeReview = ctrlWrapper(async (req, res, next) => {
  const { id } = req.params;
  const removedReview = await Review.findByIdAndRemove(id);
  if (!removedReview) {
    throw new HttpError(404, "Review not found");
  }
  res.status(200).json(removedReview);
});

module.exports = {
  getAllReview,
  getOwnReview,
  createReview,
  updateReview,
  removeReview,
};
