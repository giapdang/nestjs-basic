export default (): any => ({
  port: parseInt(process.env.APP_PORT, 10) || 3000,
  jwt: {
    secret: process.env.JWT_SECRET_KEY,
    expire: process.env.JWT_EXPIRE_TIME,
    refreshSecret: process.env.JWT_REFRESH_SECRET_KEY,
    refreshExpire: process.env.JWT_REFRESH_EXPIRE_TIME,
    issuer: 'Training',
  },
  database: {
    postgres: {
      host: process.env.POSTGRES_HOST || '127.0.0.1',
      port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
      username: process.env.POSTGRES_USERNAME || 'root',
      password: process.env.POSTGRES_PASSWORD || '',
      database: process.env.POSTGRES_DATABASE || '',
    },
  },
});
