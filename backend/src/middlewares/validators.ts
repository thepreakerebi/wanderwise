import { Request, Response, NextFunction, RequestHandler } from 'express';
import { check, validationResult, ValidationChain } from 'express-validator';

const validateResults: RequestHandler = (req, res, next): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

export const validateRegistration: RequestHandler[] = [
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  validateResults,
];

export const validateLogin: RequestHandler[] = [
  check('email').isEmail().withMessage('Please provide a valid email'),
  check('password').notEmpty().withMessage('Password is required'),
  validateResults,
];

export const validateTrip: RequestHandler[] = [
  check('title').notEmpty().withMessage('Title is required'),
  check('startDate').isISO8601().withMessage('Valid start date is required'),
  check('endDate').isISO8601().withMessage('Valid end date is required'),
  check('destinations').isArray({ min: 1 }).withMessage('At least one destination is required'),
  check('destinations.*.city').notEmpty().withMessage('City is required for each destination'),
  check('destinations.*.country').notEmpty().withMessage('Country is required for each destination'),
  check('budget.amount').isNumeric().withMessage('Budget amount must be a number'),
  check('budget.currency').notEmpty().withMessage('Budget currency is required'),
  check('numberOfTravelers').isInt({ min: 1 }).withMessage('Number of travelers must be at least 1'),
  validateResults,
]; 