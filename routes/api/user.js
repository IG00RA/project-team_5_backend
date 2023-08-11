const express = require("express");

const router = express.Router();

const { validateBody, authenticate, upload } = require("../../middlewares");

const ctrl = require("../../controllers/userController");

const schemas = require("../../schemas/validationUserSchema");

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch(
  "/change-profile",
  authenticate,
  validateBody(schemas.updateSchema),
  ctrl.updateUserProfile
);

module.exports = router;
