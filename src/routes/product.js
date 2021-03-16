import express from "express";
import { adminMiddleware, requireSignin } from "../common-middleware/index.js";
import { addProduct } from "../controllers/product.js";
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'backend/src/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage });

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), addProduct);

export default router;