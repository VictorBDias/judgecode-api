import BaseRepository from 'App/Shared/Repositories/BaseRepository'
import Category from 'App/Modules/Problems/Models/Category'
import { ICategory } from 'App/Modules/Problems/Interfaces/ICategory'

export default class CategoriesRepository
  extends BaseRepository<typeof Category>
  implements ICategory.Repository
{
  constructor() {
    super(Category)
  }
}
