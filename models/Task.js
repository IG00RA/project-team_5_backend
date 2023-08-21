const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");
const { validateTime } = require("../middlewares/validateTime");

const timeRegexp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const dataRegexp = /^\d{4}-\d{2}-\d{2}$/;

const priorityType = ["low", "medium", "high"];
const categoryType = ["in-progress", "completed", "pending"];

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

tasksSchema.plugin(validateTime).post("save", handleMongooseError);

const validateStartEndTime = (obj, helpers) => {
  function toMinute(time) {
    const arrTime = time.split(":");
    return Number(arrTime[0]) * 60 + Number(arrTime[1]);
  }
  const { start, end } = obj;

  if (toMinute(start) >= toMinute(end)) {
    return helpers.error("any.invalid");
  }
};

const addSchema = Joi.object({
  title: Joi.string().max(250).required(),
  date: Joi.string().pattern(dataRegexp).min(10).max(10).required().messages({
    "string.pattern.base": `The field "date" must be of the following type "YYYY-MM-DD"`,
  }),
  start: Joi.string().pattern(timeRegexp).min(5).max(5).required().messages({
    "string.pattern.base": `The field "start" must be of the following type "hh:mm"`,
  }),

  end: Joi.string().pattern(timeRegexp).min(5).max(5).required().messages({
    "string.pattern.base": `The field "end" must be of the following type "hh:mm"`,
  }),
  priority: Joi.string()
    .valid(...priorityType)
    .required(),

  category: Joi.string()
    .valid(...categoryType)
    .required(),
})
  .custom(validateStartEndTime)
  .messages({
    "any.invalid": `The following condition must be met start<end`,
  });

const Task = model("task", tasksSchema);

module.exports = { Task, addSchema };
