import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { GraphQLModule } from '@nestjs/graphql';
import * as configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { TypeOrmConfigService } from './common/services/typeorm-config.service';
import { BookmarkModule } from './bookmark/bookmark.module';
import { TagModule } from './tag/tag.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { ReactionModule } from './reaction/reaction.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: './graphql-schema.gql',
      debug: true,
      playground: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration.configuration],
      validationSchema: configuration.validationSchema,
      validationOptions: configuration.validationOptions,
    }),
    { module: AuthModule, global: true },
    UserModule,
    PostModule,
    CommentModule,
    TagModule,
    BookmarkModule,
    ReactionModule,
  ],
})
export class AppModule {}
