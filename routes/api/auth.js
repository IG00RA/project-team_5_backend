const express = require("express");

const router = express.Router();

const { validateBody, authenticate } = require("../../middlewares");

const ctrl = require("../../controllers/authControllers");

const schemas = require("../../schemas/validationUserSchema");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
