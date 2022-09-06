import { Joi, Segments } from 'celebrate';

const SigninSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
};

const SignupSchema = {
  body: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('admin', 'user').required(),
  },
};

export default {
  SignupSchema,
  SigninSchema,
};
