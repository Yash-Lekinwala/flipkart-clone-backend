import express from 'express';
import { adminMiddleware, requireSignin, upload } from '../../common-middleware/index.js';
import { createPage, getPage } from '../../controllers/admin/page.js';

const router = express.Router();

router.post('/page/create', requireSignin, adminMiddleware, upload.fields([
    {name: 'banners'},
    {name: 'products'}
]), createPage);

router.get(`/page/:category/:type`, getPage);

export default router;