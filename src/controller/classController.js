const { bcryptUtil } = require("../config/hash")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CTDT = require('../models/ctdt')
const User = require('../models/user')
const Course = require("../models/course")
const Class = require("../models/class")
const ClassExam = require("../models/classExam")
const classExam = require("../models/classExam")
const Joi = require('joi');

module.exports = {
  getClass: async (req, res) => {
    let results = await Class.find({});
    return res.render('build/pages/class_management.ejs', { listClassByCourse: results })
  },
  postClass: async (req, res) => {
    const newData = req.body;
    try {
      const createdData = await Class.create(newData);
      res.status(201).json(createdData); // Trả về dữ liệu mới đã được thêm vào
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  putClass: async (req, res) => {
    const ClassID = req.params.idClass;
    const newData = req.body;
    try {
      const updatedData = await Class.findByIdAndUpdate(ClassID, newData, { new: true });
      res.status(200).json(updatedData);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  deteteClass: async (req, res) => {
    const ClassID = req.params.idClass;

    try {
      // Xóa dữ liệu từ cơ sở dữ liệu dựa trên _id
      await Class.findByIdAndDelete(ClassID);
      res.status(204).end(); // Trả về mã trạng thái 204 (No Content) khi xóa thành công
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}

