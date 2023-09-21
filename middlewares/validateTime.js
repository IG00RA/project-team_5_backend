const moment = require("moment");

const validateTime = (obj, helpers) => {
  const startMoment = moment(obj.start, "HH:mm", true);
  const endMoment = moment(obj.end, "HH:mm", true);
  if (!endMoment.isAfter(startMoment)) {
    return helpers.message("End time must be later than start time");
  } else return obj;
};

module.exports = { validateTime };
