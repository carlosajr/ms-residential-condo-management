import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableExpenseApprovals1744931600000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'expense_approvals',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'expenseId', type: 'int' },
          { name: 'userId', type: 'int' },
          { name: 'created_at', type: 'datetime', default: 'GETDATE()' },
        ],
        foreignKeys: [
          {
            columnNames: ['expenseId'],
            referencedTableName: 'condo_expenses',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['userId'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('expense_approvals');
  }
}
