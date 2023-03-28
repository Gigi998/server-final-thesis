const Student = require("../model/Student");

const getAllStudents = async (req, res) => {
  const students = await Student.find();
  if (!students) return res.status(204).json({ message: "No students in db" });
  res.json(students);
};

const addNewStudent = async (req, res) => {
  if (!req?.body?.firstname || !req?.body?.lastname)
    return res
      .status(400)
      .json({ message: "First and lastname are required." });
  try {
    const result = await Student.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    res.status(201).json({ message: `Student ${req.body.firstname} created` });
  } catch (error) {
    console.error(error);
  }
};

const deleteStudent = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Id parametar is required" });
  const findStudent = await Student.findOne({ _id: req.body.id }).exec();
  if (!findStudent) {
    return res
      .status(400)
      .json({ message: `There is no student matches your id ${req.body.id}` });
  }
  const result = await findStudent.deleteOne({ _id: req.body.id });
  res.json(result);
};

module.exports = { getAllStudents, addNewStudent, deleteStudent };
