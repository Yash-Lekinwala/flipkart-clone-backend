import express from 'express';
import { signin, signup } from '../../controllers/admin/auth.js';
import { isRequestValidated, validateSignInRequest, validateSignUpRequest } from '../../validators/auth.js';

const router = express.Router();

router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin);
router.post('/admin/signup', validateSignUpRequest, isRequestValidated, signup);

export default router;