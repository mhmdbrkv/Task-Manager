const mongoose = require("mongoose");
const validationResult = require("express-validator").validationResult;

mongoose.set("strictQuery", false);

const taskModel = require("../models/taskModel");

const getTasks = async (req, res, next) => {
  await taskModel
    .find()
    .then((result) => {
      res.render("index", {
        data: result,
        errors: req.flash("validationResult"),
      });
    })
    .catch((err) => console.log(err));
};

const addTasks = async (req, res, next) => {
  if (validationResult(req).isEmpty()) {
    await new taskModel(req.body)
      .save()
      .then(() => {
        res.redirect("/");
      })
      .catch((err) => console.log(err));
  } else {
    req.flash("validationResult", validationResult(req).array());
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
  if (validationResult(req).isEmpty()) {
  await taskModel
    .findByIdAndUpdate(req.body.ID, {
      task: req.body.modifiedText,
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
  }else{
    req.flash("updateResult", validationResult(req).array());
    res.redirect(`/update/${req.body.ID}`);
  }
};

module.exports = { getTasks, addTasks, deleteTasks, updateTasks };
