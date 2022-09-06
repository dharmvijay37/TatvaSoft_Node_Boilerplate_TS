import * as dotenv from 'dotenv';

dotenv.config();

const environmentConfig = Object.freeze({
  NODE_ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  PORT: process.env.PORT ? process.env.PORT : 3001,
  JWT_SECRET: process.env.JWT_SECRET ? process.env.JWT_SECRET : 'secret123',
});
export default environmentConfig;
