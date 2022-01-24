import { ConnectionOptions } from 'typeorm';

const ormconfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'pikabu',
  password: '123',
  database: 'pikabu',
  entities: [__dirname + '/**/*.entity{.js,.ts}'],
  synchronize: true,
  migrations: [__dirname + '/migration/**/*{.js,.ts}'],
  logging: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};

export default ormconfig;
