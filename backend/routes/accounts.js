import mongoose from "mongoose";

const { Router } = require("express");
const authMiddleware = require("../middleware");
const { Account } = require("../db");

const router = Router();

router.get("/balance",authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.id
    });

    res.json({
        balance: account.balance
    });
});

router.post("/transaction", authMiddleware, async (req, res) => {
    const {amount,to} = req.body;
    const session = await mongoose.startSession();
    session.startTransaction();
    const account = await Account.findOne({
        _id : req.id
    });

    if(account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({
        _id: to
    });

    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            msg: "Invalid account"
        });
    }
    
    await Account.updateOne({
        _id: req.id
    },{
        $inc: {balance: -amount}
    });

    await Account.updateOne({
        _id: to
    },{
        $inc: {balance: amount}
    });
    await session.commitTransaction();

    res.json({
        msg: "Transaction successful"
    });
});

export default Router();