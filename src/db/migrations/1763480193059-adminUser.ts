import { MigrationInterface, QueryRunner } from "typeorm";

export class AdminUser1763480193059 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO usuarios (nome, senha, email, tipo)
            VALUES ('admin','$2b$10$CY7rPNctocs9CNiczjEZDeUAOB6E7N4iSlxZfasOmJircmSq9Cr8K','admin@admin.com.br','admin')
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
