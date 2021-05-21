import express, { Request, Response } from 'express'
import { body } from 'express-validator'

import { validateRequest } from '../middlewares/validate_request'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must supply a password')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body
  }
)

export { router as signinRouter }
