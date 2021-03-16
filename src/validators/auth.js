import { check, validationResult } from "express-validator";

export const validateSignUpRequest = [
    check('firstName')
    .notEmpty()
    .withMessage('firstName is required'),
    check('lastName')
    .notEmpty()
    .withMessage('lastName is required'),
    check('email')
    .isEmail()
    .withMessage('Email is not valid'),
    check('password')
    .isLength({min:6})
    .withMessage('passsword must be 6 characters or more.'),
];

export const validateSignInRequest = [
    check('email')
    .isEmail()
    .withMessage('Email is not valid'),
    check('password')
    .isLength({min:6})
    .withMessage('passsword must be 6 characters or more.'),
];

export const isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0)
        return res.status(400).json({ error: errors.array()[0].msg });

    next();
}