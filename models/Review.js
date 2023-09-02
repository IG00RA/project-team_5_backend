const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const reviewsSchema = new Schema(
  {
    raiting: {
      type: String,
      enum: ["1", "2", "3", "4", "5"],
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    owner: {
      type: Schema.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: false, collection: "reviews" }
);

reviewsSchema.post("save", handleMongooseError);

const addReviewSchema = Joi.object({
  raiting: Joi.string().required().valid("1", "2", "3", "4", "5").messages({
    "string.empty": "Rating is required",
    "any.only": "Rating must be one of '1', '2', '3', '4', or '5'",
    "any.required": "Rating is required",
  }),
  review: Joi.string().min(5).max(300).required().messages({
    "string.empty": "Review is required",
    "string.min": "Review must be at least 5 characters",
    "string.max": "Review must not exceed 300 characters",
    "any.required": "Review is required",
  }),
});

const Review = model("review", reviewsSchema);

module.exports = { Review, addReviewSchema };
