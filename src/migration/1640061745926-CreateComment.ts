import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateComment1640061745926 implements MigrationInterface {
  name = 'CreateComment1640061745926';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "comments"`);
  }
}
