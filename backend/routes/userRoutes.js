const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");
const authenticate = require("../middleware/authMiddleware");
const employeeAuthorization = require("../middleware/employeeMiddleware");
const adminAuthorization = require("../middleware/adminMiddleware");

router.post("/create", UserController.createUser);

router.post(
  "/find-by-id",
  authenticate,
  employeeAuthorization,
  UserController.findUserById
);

router.get(
  "/find-by-username",
  authenticate,
  adminAuthorization,
  UserController.findUserByUsername
);

router.put(
  "/update",
  authenticate,
  employeeAuthorization,
  UserController.updateUser
);

router.delete(
  "/delete",
  authenticate,
  adminAuthorization,
  UserController.deleteUser
);

router.get(
  "/get-all-admins",
  authenticate,
  adminAuthorization,
  UserController.getAllAdmins
);

router.get(
  "/get-all-employee",
  authenticate,
  adminAuthorization,
  UserController.getAllEmployees
);

router.get(
  "/giving-access-employee",
  authenticate,
  adminAuthorization,
  UserController.givingAccessEmployee
);

router.post("/sign-in", UserController.signIn);

module.exports = router;
