import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Logger from '@ioc:Adonis/Core/Logger'

export default class CategoriesSchema extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

        table.string('name', 80).notNullable().unique()
        table.text('description').nullable()

        table.boolean('is_deleted').notNullable().defaultTo(false)
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
        table.timestamp('deleted_at', { useTz: true }).defaultTo(null)
      })
    else Logger.info('Categories migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
