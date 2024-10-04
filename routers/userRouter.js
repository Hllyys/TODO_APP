const userRouter = require("../controllers/userController");
const router = require("express").Router();


router.get("/:id", userRouter._getUser);
router.put("/:id", userRouter._updateUser);
router.delete("/:id", userRouter._deleteUser);

module.exports = router;