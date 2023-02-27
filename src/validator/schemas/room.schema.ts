import joi from "joi";

const updateRoomValidator = joi.object().keys({
  name: joi.string().optional(),
  price: joi.number().optional(),
  roomType: joi.string().hex().length(24).optional(),
});

const roomValidator = joi.object().keys({
  name: joi.string().required(),
  price: joi.number().required(),
  roomType: joi.string().hex().length(24).required(),
});

export default { updateRoomValidator, roomValidator };
