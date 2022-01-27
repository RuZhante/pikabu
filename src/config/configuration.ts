import Joi from '@hapi/joi';

export const validationSchema = Joi.object({
  PORT: Joi.number().port().required(),
  // jwt
  JWT_SECRET_KEY: Joi.string().required(),

  // database
  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
});

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const configuration = () => ({
  port: parseInt(process.env.PORT),
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
});

export const validationOptions = {
  abortEarly: true,
};
