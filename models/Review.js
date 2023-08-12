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
  { versionKey: false, timestamps: true, collection: "reviews" }
);

reviewsSchema.post("save", handleMongooseError);

const addReviewSchema = Joi.object({
  raiting: Joi.string().valid("1", "2", "3", "4", "5"),
  review: Joi.string().min(5).max(250),
});

const Review = model("review", reviewsSchema);

module.exports = { Review, addReviewSchema };
