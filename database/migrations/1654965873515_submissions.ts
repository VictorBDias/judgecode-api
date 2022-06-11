import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import Logger from '@ioc:Adonis/Core/Logger'

export default class SubmissionsSchema extends BaseSchema {
  protected tableName = 'submissions'

  public async up() {
    if (!(await this.schema.hasTable(this.tableName)))
      this.schema.createTable(this.tableName, (table) => {
        table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

        table.text('source_code').notNullable()
        table.text('language').notNullable()

        table
          .uuid('problem_id')
          .references('id')
          .inTable('problems')
          .notNullable()
          .onDelete('CASCADE')
          .onUpdate('CASCADE')

        table
          .uuid('user_id')
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
    else Logger.info('Submissions migration already running')
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
