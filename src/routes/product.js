import express from "express";
import { adminMiddleware, requireSignin, upload } from "../common-middleware/index.js";
import { addProduct, getProductsBySlug } from "../controllers/product.js";

const router = express.Router();

router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), addProduct);
router.get('/products/:slug', getProductsBySlug);

export default router;