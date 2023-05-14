const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const taskModel = require("../models/taskModel");

const getTasks = async (req, res, next) => {
  await taskModel
    .find()
    .then((result) => {
      res.render("index", { data: result });
    })
    .catch((err) => console.log(err));
};

const addTasks = async (req, res, next) => {
  if (req.body.task) {
    await new taskModel(req.body)
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  } else {
    res.redirect("/");
  }
};

const deleteTasks = async (req, res, next) => {
  await taskModel
    .findByIdAndDelete(req.body.ID)
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

const updateTasks = async (req, res, next) => {
  await taskModel
    .findByIdAndUpdate(req.body.ID, {
      task: req.body.modifiedText,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

module.exports = { getTasks, addTasks, deleteTasks, updateTasks };
