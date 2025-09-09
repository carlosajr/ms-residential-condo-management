import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableRequests1744925335300 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'requests',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'GETDATE()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('requests');
  }
}
