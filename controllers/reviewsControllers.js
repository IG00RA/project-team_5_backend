const { ctrlWrapper, HttpError } = require("../helpers");
const { Review } = require("../models/Review");

const getAllReview = ctrlWrapper(async (req, res, next) => {
  const reviews = await Review.find().populate({
    path: "owner",
    select: "userName avatarURL",
  });
  res.status(200).json(reviews);
});

const getOwnReview = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const ownReview = await Review.findOne({ owner });
  if (!ownReview) {
    throw new HttpError(404, "Review not found");
  }
  res.status(200).json(ownReview);
});

const createReview = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const ownReview = await Review.findOne({ owner });
  if (ownReview) {
    throw new HttpError(409, "You have already submitted a review");
  }
  const newReview = await Review.create({ ...req.body, owner });
  res.status(201).json(newReview);
});

const updateReview = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const ownReview = await Review.findOne({ owner });
  if (!ownReview) {
    throw new HttpError(404, "Review not found");
  }
  const updatedReview = await Review.findOneAndUpdate(ownReview, req.body, {
    new: true,
  });
  if (!updatedReview) {
    throw new HttpError(404, "Review not found");
  }
  res.status(200).json(updatedReview);
});

const removeReview = ctrlWrapper(async (req, res, next) => {
  const { _id: owner } = req.user;
  const ownReview = await Review.findOne({ owner });
  if (!ownReview) {
    throw new HttpError(404, "Review not found");
  }
  const removedReview = await Review.findOneAndRemove(ownReview);
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
