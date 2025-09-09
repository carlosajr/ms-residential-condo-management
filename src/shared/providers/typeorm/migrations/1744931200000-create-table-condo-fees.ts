import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableCondoFees1744931200000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'condo_fees',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'month', type: 'int' },
          { name: 'year', type: 'int' },
          { name: 'amount', type: 'decimal', precision: 10, scale: 2 },
          { name: 'status', type: 'varchar' },
          { name: 'asaasPaymentId', type: 'varchar', isNullable: true },
          { name: 'externalReference', type: 'varchar', isNullable: true },
          { name: 'dueDate', type: 'date' },
          { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
          { name: 'updated_at', type: 'datetime', default: 'GETDATE()' },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('condo_fees');
  }
}
