import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTagAndRefBetweenPost1640532386433
  implements MigrationInterface
{
  name = 'CreateTagAndRefBetweenPost1640532386433';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "tagName" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tags_posts_posts" ("tagsId" integer NOT NULL, "postsId" integer NOT NULL, CONSTRAINT "PK_80913b365feabf5036e3f1dd67b" PRIMARY KEY ("tagsId", "postsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fff7d6237fcff2a66b701d6995" ON "tags_posts_posts" ("tagsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c24352ded9a4768d79a9456ec9" ON "tags_posts_posts" ("postsId") `,
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "tag"`);
    await queryRunner.query(
      `ALTER TABLE "tags_posts_posts" ADD CONSTRAINT "FK_fff7d6237fcff2a66b701d6995e" FOREIGN KEY ("tagsId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags_posts_posts" ADD CONSTRAINT "FK_c24352ded9a4768d79a9456ec98" FOREIGN KEY ("postsId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tags_posts_posts" DROP CONSTRAINT "FK_c24352ded9a4768d79a9456ec98"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tags_posts_posts" DROP CONSTRAINT "FK_fff7d6237fcff2a66b701d6995e"`,
    );
    await queryRunner.query(`ALTER TABLE "posts" ADD "tag" integer`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c24352ded9a4768d79a9456ec9"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fff7d6237fcff2a66b701d6995"`,
    );
    await queryRunner.query(`DROP TABLE "tags_posts_posts"`);
    await queryRunner.query(`DROP TABLE "tags"`);
  }
}
