
const { body, validationResult } = require('express-validator');
const userValidationRules = () => {
    return [
        body('firstName').trim().escape().not().isEmpty().withMessage('First name is requied'),
        body('lastName').trim().escape().not().isEmpty().withMessage('Last name is requied'),
        body('email').isEmail().normalizeEmail({ gmail_remove_dots: true }).withMessage('Please include a valid email'),
        body('favoriteColor').trim().escape().not().isEmpty().withMessage('Favorite color is requied'),
        body('birthday').trim().escape().not().isEmpty().withMessage('Birthdate is required and cannot be in the future'),
    ]    
  }

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }))
  
    return res.status(422).json({
      errors: extractedErrors,
    })
  }

module.exports = {userValidationRules, validate}
