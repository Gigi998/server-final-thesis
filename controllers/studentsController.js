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
  if (!req?.params?.id)
    return res.status(400).json({ message: "Id parametar is required" });
  const { id: StudentID } = req.params;
  const findStudent = await Student.findOneAndDelete({ _id: StudentID }).exec();
  if (!findStudent) {
    return res
      .status(400)
      .json({ message: `There is no student matches your id ${StudentID}` });
  }
  res.json(findStudent);
};

module.exports = { getAllStudents, addNewStudent, deleteStudent };
