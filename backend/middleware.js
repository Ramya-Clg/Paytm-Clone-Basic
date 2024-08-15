const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config");

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({
            msg: "Token is required"
        });
    }

    const token = authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            msg: "Token is required"
        });
    }

    try{
        const payload = jwt.verify(token, JWT_SECRET);
        console.log(payload);
        req.id = payload.id;
        next();
    }catch(err){
        return res.status(401).json({
            msg: "Invalid token"
        });
    }
}

module.exports = authMiddleware;