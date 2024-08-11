import accountRouter from "./accounts.js";

const { Router } = require("express");
const userRouter = require("./user.js");

const router = Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

export default router;