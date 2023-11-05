const express = require("express");
const router = express.Router();
const controller = require("../controllers/article.controller");
const multer = require("multer")();

router.post("/create", multer.single("image"), controller.create);
router.put("/update/:id", multer.single("image"), controller.update);
router.get("/:id", controller.get);
router.delete("/:id", controller.destroy);

module.exports = router;
