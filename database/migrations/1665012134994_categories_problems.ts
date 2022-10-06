import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'categories_problems'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary().defaultTo(this.db.rawQuery('uuid_generate_v4()').knexQuery)

      table
        .uuid('category_id')
        .references('id')
        .inTable('categories')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table
        .uuid('problem_id')
        .references('id')
        .inTable('problems')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
