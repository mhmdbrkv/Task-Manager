const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const schema = mongoose.Schema({
  task: {
    type: String,
    required: true,
  },
});

const taskModel = mongoose.model("tasks", schema);

module.exports = taskModel;
