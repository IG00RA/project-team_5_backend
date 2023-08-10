const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

const timeRegexp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

const tasksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 250,
    },
    // start: {
    //   type: String,
    //   required: true,
    //   match: timeRegexp,
    //   default: "9:00",
    // },
    // end: {
    //   type: String,
    //   required: true,
    //   match: timeRegexp,
    //   default: "9:00",
    // },
    // priority: {
    //   type: String,
    //   enum: ["low", "medium", "high"],
    //   default: "low",
    // },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    // category: {
    //   type: String,
    //   enum: ["to-do", "in-progress", "done"],
    //   required: true,
    // },
    owner: {
      type: Schema.ObjectId,
      required: true,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true, collection: "tasks" }
);

tasksSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  title: Joi.string().min(3).max(250).required(),
  //   start: Joi.string().regex(timeRegexp).required(),
  //   end: Joi.string().regex(timeRegexp).required(),
  //   priority: Joi.string().valid("low", "medium", "high").required(),
  //   date: Joi.date().required(),
  //   category: Joi.string(),
});

const Task = model("task", tasksSchema);

module.exports = { Task, addSchema };
