const router = require("express").Router();
const taskController = require("../controllers/taskController");

router.get("/", taskController._getTasks);
router.get("/task/:id", taskController._gettask);
router.put("/:id", taskController._updateTask);
router.delete("/:id", taskController._deleteTask);
router.post("/", taskController._addTask);

module.exports = router;