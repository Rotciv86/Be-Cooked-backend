import { Joi } from "express-validation";

const registerUserSchema = {
  body: Joi.object({
    username: Joi.string().min(4).required(),
    password: Joi.string().min(4).required(),
  }),
};

export default registerUserSchema;
