import jwt from "jsonwebtoken";
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';

const __dirname = path.resolve();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'backend/src/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});

export const upload = multer({ storage });

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