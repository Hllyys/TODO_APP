const userRouter = require("../controllers/userController");
const router = require("express").Router();


// router.get("/login/:id",userRouter._addlogin);
router.get("/:id", userRouter._getUser);
router.put("/:id", userRouter._updateUser);
router.delete("/:id", userRouter._deleteUser);
// router.post("/", userRouter._addUser);

module.exports = router;