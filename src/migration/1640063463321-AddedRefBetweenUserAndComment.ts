import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedRefBetweenUserAndComment1640063463321
  implements MigrationInterface
{
  name = 'AddedRefBetweenUserAndComment1640063463321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" ADD "userId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_7e8d7c49f218ebb14314fdb3749"`,
    );
    await queryRunner.query(`ALTER TABLE "comments" DROP COLUMN "userId"`);
  }
}
