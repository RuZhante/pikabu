import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from 'ormconfig';

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

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
