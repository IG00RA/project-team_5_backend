const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const { validateTime } = require("../middlewares/validateTime");
const { timeRegexp } = require("../constants/regexPatterns");

const tasksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 250,
    },
    start: {
      type: String,
      default: "09:00",
      match: timeRegexp,
    },
    end: {
      type: String,
      default: "09:30",
      match: timeRegexp,
      validate: {
        validator: function (value) {
          return value >= this.start;
        },
        message: "it cannot be earlier than start",
      },
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    date: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["to-do", "in-progress", "done"],
      required: true,
    },
    owner: {
      type: Schema.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: false, collection: "tasks" }
);
tasksSchema.post("save", handleMongooseError);
tasksSchema.plugin(validateTime).post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().min(3).max(250).required(),
  start: Joi.string().regex(timeRegexp),
  end: Joi.string().regex(timeRegexp),
  priority: Joi.string().valid("low", "medium", "high"),
  date: Joi.string().isoDate().required(),
  category: Joi.string().valid("to-do", "in-progress", "done").required(),
});

const Task = model("task", tasksSchema);

module.exports = { Task, addSchema };
