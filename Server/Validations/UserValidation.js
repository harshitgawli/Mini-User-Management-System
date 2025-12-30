import Joi from "joi";

// SIGNUP VALIDATION
export const userSignUpValidationSchema = Joi.object({
  fullName: Joi.string().trim().min(3).required().messages({
    "string.empty": "Full name is required",
    "any.required": "Full name is required",
  }),

  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().min(6).required().messages({
    "string.min": "Password must be at least 6 characters",
    "any.required": "Password is required",
  }),
});

// LOGIN VALIDATION
export const userLoginValidationSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    "string.email": "Please provide a valid email",
    "any.required": "Email is required",
  }),

  password: Joi.string().required().messages({
    "any.required": "Password is required",
  }),
});

export const updateProfileValidationSchema = Joi.object({
  fullName: Joi.string().trim().min(3).required().messages({
    "any.required": "Full name is required",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
});
