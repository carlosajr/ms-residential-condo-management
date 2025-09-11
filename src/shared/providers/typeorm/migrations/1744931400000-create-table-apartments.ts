import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableApartments1744931400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'apartments',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'number', type: 'varchar' },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('apartments');
  }
}
