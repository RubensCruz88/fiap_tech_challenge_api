import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRole1762961698040 implements MigrationInterface {
    name = 'AddUserRole1762961698040'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."usuarios_tipo_enum" AS ENUM('admin', 'professor', 'aluno')`);
        await queryRunner.query(`ALTER TABLE "usuarios" ADD "tipo" "public"."usuarios_tipo_enum" NOT NULL DEFAULT 'aluno'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuarios" DROP COLUMN "tipo"`);
        await queryRunner.query(`DROP TYPE "public"."usuarios_tipo_enum"`);
    }

}
