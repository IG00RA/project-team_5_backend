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
  title: Joi.string().min(3).max(250).required().messages({
    "string.empty": "Title is required",
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 250 characters",
    "any.required": "Title is required",
  }),
  start: Joi.string().regex(timeRegexp).messages({
    "string.pattern.base":
      "Start time must be in HH:mm format (example, 08:30)",
  }),
  end: Joi.string().regex(timeRegexp).messages({
    "string.pattern.base":
      "Start time must be in HH:mm format (example, 08:30)",
  }),
  priority: Joi.string().valid("low", "medium", "high").messages({
    "any.only": "Priority must be one of 'low', 'medium', or 'high'",
  }),
  date: Joi.string().isoDate().required().messages({
    "string.empty": "Date is required",
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
});

const updateSchema = Joi.object({
  title: Joi.string().min(3).max(250).messages({
    "string.min": "Title must be at least 3 characters",
    "string.max": "Title must not exceed 250 characters",
  }),
  start: Joi.string().regex(timeRegexp).messages({
    "string.pattern.base":
      "Start time must be in HH:mm format (example, 08:30)",
  }),
  end: Joi.string().regex(timeRegexp).messages({
    "string.pattern.base":
      "Start time must be in HH:mm format (example, 09:30)",
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
});

const Task = model("task", tasksSchema);

module.exports = { Task, addSchema, updateSchema };
