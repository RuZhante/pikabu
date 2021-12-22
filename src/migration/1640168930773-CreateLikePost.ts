import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateLikePost1640168930773 implements MigrationInterface {
  name = 'CreateLikePost1640168930773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "postLikes" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "postId" integer NOT NULL, CONSTRAINT "PK_29f4abfe59a4ba82c8371037a20" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "postLikes"`);
  }
}
