const express = require("express");
const router = express.Router();
const studentsController = require("../../controllers/studentsController");

router
  .route("/")
  .get(studentsController.getAllStudents)
  .post(studentsController.addNewStudent)
  .delete(studentsController.deleteStudent);

module.exports = router;
