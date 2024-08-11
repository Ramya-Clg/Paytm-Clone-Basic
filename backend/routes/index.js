const accountRouter = require("./accounts.js");

const { Router } = require("express");
const userRouter = require("./user.js");

const router = Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

module.exports = router;