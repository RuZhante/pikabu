import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRefBetweenPostAndComment1640062990855
  implements MigrationInterface
{
  name = 'AddedRefBetweenPostAndComment1640062990855';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "postId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_e44ddaaa6d058cb4092f83ad61f"`,
    );
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "postId"`);
  }
}