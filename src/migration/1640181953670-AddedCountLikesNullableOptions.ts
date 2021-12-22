import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddedCountLikesNullableOptions1640181953670
  implements MigrationInterface
{
  name = 'AddedCountLikesNullableOptions1640181953670';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "countLikes" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "posts" ALTER COLUMN "countLikes" SET NOT NULL`,
    );
  }
}
