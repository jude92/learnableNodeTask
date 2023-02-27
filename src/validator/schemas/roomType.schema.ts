import joi from "joi";

const roomTypeValidation = joi.object().keys({
  name: joi.string().required(),
});

export default { roomTypeValidation };
