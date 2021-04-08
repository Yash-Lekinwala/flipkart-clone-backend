import express from 'express';
import { initialData } from '../../controllers/admin/initialData.js';

const router = express.Router();

router.get('/initialdata', initialData);

export default router;