import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRefBetweenPostAndPostLike1640169854578
  implements MigrationInterface
{
  name = 'AddedRefBetweenPostAndPostLike1640169854578';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "countLikes" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "postLikes" ADD CONSTRAINT "FK_26b3ed62ec22e48b9be15663ab0" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "postLikes" DROP CONSTRAINT "FK_26b3ed62ec22e48b9be15663ab0"`,
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "countLikes"`);
  }
}
