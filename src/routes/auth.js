import express from 'express';

import { signin, signup } from '../controllers/auth.js';
import { isRequestValidated, validateSignUpRequest, validateSignInRequest } from '../validators/auth.js';

const router = express.Router();

router.post('/signin', validateSignInRequest, isRequestValidated, signin);
router.post('/signup', validateSignUpRequest, isRequestValidated, signup);

export default router;