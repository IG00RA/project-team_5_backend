const express = require("express");

const router = express.Router();

const { validateBody, authenticate, upload } = require("../../middlewares");

const ctrl = require("../../controllers/userControllers");

const schemas = require("../../schemas/validationUserSchema");

router.get("/current", authenticate, ctrl.getCurrentUser);

router.patch(
  "/change-profile",
  authenticate,
  upload.single("avatarURL"),
  validateBody(schemas.updateSchema),
  ctrl.updateUserProfile
);

router.patch("/toggle-theme", authenticate, ctrl.toggleTheme);

module.exports = router;
