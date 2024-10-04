const categoryRouter=require("../controllers/categoryController");
const router=require("express").Router();

//router.get("/:id",categoryRouter._getCategory);
router.get("/",categoryRouter._getcategories);
router.put("/:id",categoryRouter._updateCategory);
router.delete("/:id",categoryRouter._deleteCategory);
router.post("/",categoryRouter._addCategory);

module.exports=router;  