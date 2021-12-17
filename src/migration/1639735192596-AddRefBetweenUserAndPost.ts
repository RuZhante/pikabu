import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRefBetweenUserAndPost1639735192596
  implements MigrationInterface
{
  name = 'AddRefBetweenUserAndPost1639735192596';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "tags"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "tag" integer`);
    await queryRunner.query(
      `ALTER TABLE "posts" ADD "userId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "image" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "image" SET NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "userId"`);
    await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "tag"`);
    await queryRunner.query(`ALTER TABLE "posts" ADD "tags" integer NOT NULL`);
  }
}
