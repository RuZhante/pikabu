import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'src/ormconfig';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    GraphQLModule.forRoot({
      autoSchemaFile: './graphql-schema.gql',
      debug: true,
      playground: true,
    }),
    ConfigModule.forRoot({
      envFilePath: './.env',
      isGlobal: true,
      load: [configuration],
    }),
    { module: AuthModule, global: true },
    UserModule,
  ],
})
export class AppModule {}
