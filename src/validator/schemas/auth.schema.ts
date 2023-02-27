import joi from "joi";

export const registrationSchema = joi.object().keys({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  role: joi.string().optional(),
});

export const loginSchema = joi.object().keys({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
