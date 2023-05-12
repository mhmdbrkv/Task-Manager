const router = require("express").Router();
const Tasks = require("../controllers/taskController");

router.get('/', Tasks.getTasks);

router.post('/', Tasks.addTasks);

router.post("/delete", Tasks.deleteTasks);

router.get("/update/:id", (req, res) => {
    res.render('update', {
        ID: req.params.id
    })
});

router.post("/update/:id", Tasks.updateTasks);

module.exports = router;
