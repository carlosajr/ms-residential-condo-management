import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterCondoExpensesAddPixApprovals1744931700000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('condo_expenses', [
      new TableColumn({ name: 'pixKey', type: 'varchar', isNullable: true }),
      new TableColumn({ name: 'approvalsRequired', type: 'int', default: 0 }),
      new TableColumn({ name: 'paid', type: 'bit', default: 0 }),
      new TableColumn({ name: 'paidByUserId', type: 'int', isNullable: true }),
      new TableColumn({ name: 'paidByApartmentId', type: 'int', isNullable: true }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('condo_expenses', 'paidByApartmentId');
    await queryRunner.dropColumn('condo_expenses', 'paidByUserId');
    await queryRunner.dropColumn('condo_expenses', 'paid');
    await queryRunner.dropColumn('condo_expenses', 'approvalsRequired');
    await queryRunner.dropColumn('condo_expenses', 'pixKey');
  }
}
