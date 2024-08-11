const zod = require("zod");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const {user, User, Account} = require("../db.js");
const authMiddleware = require("../middleware.js");
const router = Router();

const signupBody = zod.object({
    username: zod.string().email(),
	firstName: zod.string(),
	lastName: zod.string(),
	password: zod.string().minLength(6)
})

const signinBody = zod.object({
    username: zod.string().email(),
	password: zod.string().minLength(6)
})

router.post("/signup", async (req, res) => {
    const success = signupBody.safeParse(req.body);

    if(!success.success){
        return res.status(411).json({
            msg: "Invalid data"
        });
    }

    const existingUser = await user.findOne({
        username: req.body.username
    });

    if(existingUser){
        return res.status(409).json({
            msg: "User already exists"
        });
    }


    const username = req.body.username;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;

    const user = await User.create({   
        username,
        firstName,
        lastName
    });

    await Account.create({
        userId: user._id,
        balance: 1 + Math.floor(Math.random() * 1000)
    });

    const hash_password = await user.createHash(password);
    user.password_hash = hash_password;
    await user.save();

    const id = user._id;

    const token = jwt.sign({ id },JWT_SECRET); 

    res.status(200).json({
        token,
        msg: username + " signed up successfully"
    });
});

router.post("/signin", async (req, res) => {
    const {success} = signupBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg: "Invalid data"
        });
    }

    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({
        username
    });

    if(!user){
        return res.status(404).json({
            msg: "User not found"
        });
    }else{
        const isValid = await user.validatePassword(password);
        if(isValid){
            const id = user._id;
            const token = jwt.sign({ id },JWT_SECRET);
            res.status(200).json({
                token,
                msg: username + " signed in successfully"
            });
        }else{
            return res.status(401).json({
                msg: "Invalid credentials"
            });
        }
    }
});


router.use(authMiddleware);
const updateBody = zod.object({
    password: zod.string().minLength(6).optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.put("/update", async (req, res) => {
    const {success} = updateBody.safeParse(req.body);

    if(!success){
        return res.status(411).json({
            msg: "Invalid data"
        });
    }
    const password = req.body.password;
    const hash_password = await user.createHash(password);

    const user = await User.updateOne({
        password_hash: hash_password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    },{
        _id: req.id
    });

    res.json({
        msg:"User updated successfully"
    });
});

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [{
            firstName: /filter/,
            lastName: /filter/
        }]
    });
    res.json({
        user: users.map(user => {
            return {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }
        })
    });
});

export default router;