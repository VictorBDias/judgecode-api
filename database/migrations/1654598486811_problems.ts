import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Logger from '@ioc:Adonis/Core/Logger'

export default class ProblemsSchema extends BaseSchema {
  protected tableName = 'problems'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

        table.string('title', 100).notNullable()
        table.text('body').notNullable()
        table.string('language', 50).notNullable()

        table
          .uuid('owner_id')
          .references('id')
          .inTable('users')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')

        table.boolean('is_deleted').notNullable().defaultTo(false)
        table.timestamp('created_at', { useTz: true })
        table.timestamp('updated_at', { useTz: true })
        table.timestamp('deleted_at', { useTz: true }).defaultTo(null)
      })
    else Logger.info('Problems migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
