const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const taskModel = require("../models/taskModel");

const url = "mongodb://127.0.0.1:27017/ToDo-List";

const getTasks = async (req, res, next) => {
  try {
    await mongoose.connect(url);
    let resulte = await taskModel.find();
    res.render("index", { data: resulte });
    mongoose.disconnect();
  } catch (err) {
    console.log(err);
  }
};

const addTasks = async (req, res, next) => {
    if (req.body.task) {
      try {
        await mongoose.connect(url);
        await new taskModel(req.body).save();
        res.redirect("/");
        mongoose.disconnect();
      } catch (err) {
        console.log(err);
      }
    } else {
      res.redirect("/");
    }
  }

const deleteTasks = async (req, res, next) => {
    try {
      await mongoose.connect(url);
      await taskModel.findByIdAndDelete(req.body.ID);
      res.redirect("/");
      mongoose.disconnect();
    } catch (err) {
      console.log(err);
    }
  }

  const updateTasks = async (req, res, next) => {
    try {
      await mongoose.connect(url);
      await taskModel.findByIdAndUpdate(req.body.ID, {task: req.body.modifiedText});
      res.redirect("/");
      mongoose.disconnect();
    } catch (err) {
      console.log(err);
    }
  }

module.exports = {getTasks, addTasks, deleteTasks, updateTasks}