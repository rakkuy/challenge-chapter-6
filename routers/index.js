const express = require("express");
const router = express.Router();
const userRouter = require("./user.router");
const categoryRouter = require("./category.router");
const articleRouter = require("./article.router");

router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/article", articleRouter);

module.exports = router;
