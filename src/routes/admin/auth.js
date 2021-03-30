import express from 'express';
import { requireSignin } from '../../common-middleware/index.js';
import { signin, signout, signup } from '../../controllers/admin/auth.js';
import { isRequestValidated, validateSignInRequest, validateSignUpRequest } from '../../validators/auth.js';

const router = express.Router();

router.post('/admin/signin', validateSignInRequest, isRequestValidated, signin);
router.post('/admin/signup', validateSignUpRequest, isRequestValidated, signup);
router.post('/admin/signout', requireSignin, signout);

export default router;