import joi from "joi";

export const roomTypeValidation = joi.object().keys({
  name: joi.string().required(),
});
