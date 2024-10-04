const router = require("express").Router();
const fileController = require("../controllers/fileController");
const upload = require("../middlewares/multer");

router.post("/", upload.single('file'), fileController._addFile);
router.put("/:id", upload.single('file'), fileController._updateFile);
router.delete("/:id", fileController._deleteFile);
router.get("/:id", fileController._getFile);

module.exports = router;