import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableApartments1744931400000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'apartments',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'number', type: 'varchar' },
          { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
          { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('apartments');
  }
}
