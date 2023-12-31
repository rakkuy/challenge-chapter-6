const express = require("express");
const router = express.Router();
const controller = require("../controllers/category.controller");

router.post("/create", controller.create);
router.put("/update/:id", controller.update);
router.get("/listcategory", controller.listCategory);
router.get("/:id", controller.getId);
router.delete("/:id", controller.destroy);

module.exports = router;
