import * as Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().port().required(),
  // jwt
  JWT_SECRET_KEY: Joi.string().required(),

  // database
  POSTGRES_HOST: Joi.string().required(),
  POSTGRES_PORT: Joi.number().port().required(),
  POSTGRES_DB: Joi.string().required(),
  POSTGRES_USER: Joi.string().required(),
  POSTGRES_PASSWORD: Joi.string().required(),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const configuration = () => ({
  port: parseInt(process.env.PORT),
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT),
    name: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
});

export const validationOptions = {
  abortEarly: true,
};
