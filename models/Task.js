const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const { timeRegexp } = require("../constants/regexPatterns");
const moment = require("moment");

const tasksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 250,
    },
    start: {
      type: String,
      required: true,
      match: timeRegexp,
    },
    end: {
      type: String,
      required: true,
      match: timeRegexp,
      validate: {
        validator: function (value) {
          return value >= this.start;
        },
        message: "End time must be later than start time",
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

const addSchema = Joi.object({
  title: Joi.string().min(3).max(250).required().messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 250 characters",
    "any.required": "Title is required",
  }),

  start: Joi.string().regex(timeRegexp).required().messages({
    "string.pattern.base":
      "Start time must be in HH:mm format (example, 08:30)",
    "any.required": "Start time is required",
  }),

  end: Joi.string().required().regex(timeRegexp).messages({
    "string.pattern.base": "End time must be in HH:mm format (example, 17:00)",
    "any.required": "End time is required",
  }),

  priority: Joi.string().valid("low", "medium", "high").messages({
    "any.only": "Priority must be one of 'low', 'medium', or 'high'",
  }),

  date: Joi.string().isoDate().required().messages({
    "string.isoDate":
      "Date must be in format 'YYYY-MM-DD' (example, 2023-07-12)",
    "any.required": "Date is required",
  }),

  category: Joi.string()
    .valid("to-do", "in-progress", "done")
    .required()
    .messages({
      "any.only": "Category must be one of 'to-do', 'in-progress', or 'done'",
      "any.required": "Category is required",
    }),
}).custom((obj, helpers) => {
  const startMoment = moment(obj.start, "HH:mm", true);
  const endMoment = moment(obj.end, "HH:mm", true);
  if (!endMoment.isAfter(startMoment)) {
    return helpers.message("End time must be later than start time");
  } else return obj;
});

const updateSchema = Joi.object({
  title: Joi.string().min(3).max(250).messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 250 characters",
  }),

  start: Joi.string().regex(timeRegexp).required().messages({
    "string.pattern.base":
      "Start time must be in HH:mm format (example, 08:30)",
    "any.required": "Start time is required",
  }),

  end: Joi.string().required().regex(timeRegexp).messages({
    "string.pattern.base": "End time must be in HH:mm format (example, 17:00)",
    "any.required": "End time is required",
  }),

  priority: Joi.string().valid("low", "medium", "high").messages({
    "any.only": "Priority must be one of 'low', 'medium', or 'high'",
  }),

  date: Joi.string().isoDate().messages({
    "string.isoDate":
      "Date must be in format 'YYYY-MM-DD' (example, 2023-07-12)",
  }),

  category: Joi.string().valid("to-do", "in-progress", "done").messages({
    "any.only": "Category must be one of 'to-do', 'in-progress', or 'done'",
  }),
}).custom((obj, helpers) => {
  const startMoment = moment(obj.start, "HH:mm", true);
  const endMoment = moment(obj.end, "HH:mm", true);
  if (!endMoment.isAfter(startMoment)) {
    return helpers.message("End time must be later than start time");
  } else return obj;
});

const Task = model("task", tasksSchema);

module.exports = { Task, addSchema, updateSchema };
