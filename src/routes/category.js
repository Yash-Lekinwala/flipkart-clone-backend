import express from "express";
import { adminMiddleware, requireSignin } from "../common-middleware/index.js";
import { addCategory, deleteCategories, getCategories, updateCategories } from "../controllers/category.js";
import multer from 'multer';
import shortid from 'shortid';
import path from 'path';

const router = express.Router();
const __dirname = path.resolve();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'backend/src/uploads/category/'))
    },
    filename: function (req, file, cb) {
        cb(null, shortid.generate() + '-' + file.originalname)
    }
})
const upload = multer({ storage });

router.post('/category/create', requireSignin, adminMiddleware, upload.single('categoryImage'), addCategory);
router.get('/category/getcategory', requireSignin, adminMiddleware, getCategories);
router.post('/category/update', requireSignin, adminMiddleware, upload.array('categoryImage'), updateCategories);
router.post('/category/delete', requireSignin, adminMiddleware, deleteCategories);

export default router;