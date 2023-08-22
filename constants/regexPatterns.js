const timeRegexp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const birthdayRegexp =
  /^(19|20)\d{2}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

module.exports = { timeRegexp, emailRegexp, birthdayRegexp };
