import express from "express";
import { userMiddleware, requireSignin } from "../common-middleware/index.js";
import { addItemsToCart } from "../controllers/cart.js";
const router = express.Router();

router.post('/user/cart/add-to-cart', requireSignin, userMiddleware, addItemsToCart);

export default router;