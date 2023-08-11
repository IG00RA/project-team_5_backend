const express = require("express");

const router = express.Router();

const { validateBody, authenticate, upload } = require("../../middlewares");

const ctrl = require("../../controllers/authController");

const schemas = require("../../schemas/validationUserSchema");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

// router.get("/users/verify/:verificationToken", ctrl.verifyEmail);

// router.post(
//   "/users/verify",
//   validateBody(schemas.emailSchema),
//   ctrl.resendVerifyEmail
// );

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

// router.patch(
//   "/avatars",
//   authenticate,
//   upload.single("avatar"),
//   ctrl.updateAvatar
// );

module.exports = router;
