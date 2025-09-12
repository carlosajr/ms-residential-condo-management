import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AlterCondoFeesAddApartment1744931800000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'condo_fees',
      new TableColumn({ name: 'apartmentId', type: 'int' }),
    );
    await queryRunner.createForeignKey(
      'condo_fees',
      new TableForeignKey({
        columnNames: ['apartmentId'],
        referencedTableName: 'apartments',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('condo_fees');
    const foreignKey = table?.foreignKeys.find((fk) => fk.columnNames.includes('apartmentId'));
    if (foreignKey) {
      await queryRunner.dropForeignKey('condo_fees', foreignKey);
    }
    await queryRunner.dropColumn('condo_fees', 'apartmentId');
  }
}
