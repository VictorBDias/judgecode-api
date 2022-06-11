import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { storeDefaultCategories } from 'App/Modules/Problems/Services/Category'

export default class CreateCategories extends BaseSchema {
  protected tableName = 'create_default_categories'

  public async up() {
    await storeDefaultCategories()
  }

  public async down() {
    this.schema.raw('truncate table categories restart identity cascade;')
  }
}
