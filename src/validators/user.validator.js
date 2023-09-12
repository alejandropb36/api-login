import { check } from "express-validator";
import { validateResult } from "../helpers/validate.helper.js";
import { isValidDate } from "./date.validator.js";


export const registerValidate = [
    check('id')
        .exists()
        .notEmpty()
        .isUUID(),
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('name')
        .exists()
        .notEmpty()
        .isString(),
    check('password')
        .exists()
        .notEmpty()
        .isLength({
            min: 6
        }),
    check('birthDate')
        .exists()
        .notEmpty()
        .custom(isValidDate)
        .withMessage('Invalid date'),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const loginValidate = [
    check('email')
        .exists()
        .notEmpty()
        .isEmail(),
    check('password')
        .exists()
        .notEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];