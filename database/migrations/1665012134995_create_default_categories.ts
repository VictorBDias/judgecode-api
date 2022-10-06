import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { storeDefaultCategories } from 'App/Modules/Problems/Services/Category'

export default class CreateCategories extends BaseSchema {
  public async up() {
    await storeDefaultCategories()
  }

  public async down() {
    this.schema.raw('truncate table categories restart identity cascade;')
  }
}
