const router = require("express").Router();
const Tasks = require("../controllers/taskController");
const check = require("express-validator").check;

router.get("/", Tasks.getTasks);

router.post(
  "/",
  check("task")
    .not()
    .isEmpty()
    .withMessage("Add your task!")
    .isLength({ max: 30 })
    .withMessage("Task length must be less than 30 character!"),
  Tasks.addTasks
);

router.post("/delete", Tasks.deleteTasks);

router.get("/update/:id", (req, res) => {
  res.render("update", {
    ID: req.params.id,
    errors: req.flash("updateResult")
  });
});

router.post(
  "/update/:id",
  check("modifiedText")
    .not()
    .isEmpty()
    .withMessage("Add task to update!")
    .isLength({ max: 30 })
    .withMessage("Task length must be less than 30 character!"),
  Tasks.updateTasks
);

module.exports = router;
