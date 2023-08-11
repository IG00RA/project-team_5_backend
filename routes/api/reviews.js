const express = require("express");
const router = express.Router();

const {
  getAllReview,
  getOwnReview,
  createReview,
  updateReview,
  removeReview,
} = require("../../controllers/reviewsController");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { addReviewSchema } = require("../../models/Review");

router.get("/", getAllReview);

router.get("/own", authenticate, getOwnReview);

router.post("/own", authenticate, validateBody(addReviewSchema), createReview);

router.patch(
  "/own",
  authenticate,
  isValidId,
  validateBody(addReviewSchema),
  updateReview
);

router.delete("/own", authenticate, isValidId, removeReview);

module.exports = {
  reviewsRouter: router,
};
