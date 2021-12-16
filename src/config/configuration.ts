export default () => ({
  PORT: parseInt(process.env.PORT) || 3000,
  database: {
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    db: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
  },
});
