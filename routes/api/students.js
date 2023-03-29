const express = require("express");
const router = express.Router();
const studentsController = require("../../controllers/studentsController");
const ROLES = require("../../config/roles");
const verifyRoles = require("../../middleware/verifyRoles");

router
  .route("/")
  .get(
    verifyRoles(ROLES.Admin, ROLES.Editor, ROLES.User),
    studentsController.getAllStudents
  )
  .post(verifyRoles(ROLES.Admin), studentsController.addNewStudent)
  .delete(verifyRoles(ROLES.Admin), studentsController.deleteStudent);

module.exports = router;
