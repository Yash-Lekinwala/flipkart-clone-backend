import jwt from "jsonwebtoken";

export const requireSignin = (req, res, next) => {
    if(req.headers.authorization)
    {
        const token = req.headers.authorization.split(" ")[1];
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
    }
    else{
        res.status(400).json({message: "Authorization Required."});
    }
    next();
}

export const userMiddleware = (req, res, next) => {
    const {role} = req.user;
    if(role !== 'user')
        res.status(400).json({message: "User access denied."});
        
    next();
}

export const adminMiddleware = (req, res, next) => {
    const {role} = req.user;
    if(role !== 'admin')
        res.status(400).json({message: "Admin access denied."});
        
    next();
}