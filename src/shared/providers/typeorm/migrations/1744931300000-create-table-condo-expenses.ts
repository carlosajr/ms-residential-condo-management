import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCondoExpenses1744931300000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'condo_expenses',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'description', type: 'varchar' },
          {
            name: 'value',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          { name: 'date', type: 'date' },
          { name: 'receiptUrl', type: 'varchar', isNullable: true },
          { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
          { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('condo_expenses');
  }
}
