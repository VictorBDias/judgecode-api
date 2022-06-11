import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  listCategories,
  getCategory,
  storeCategory,
  editCategory,
  deleteCategory,
} from 'App/Modules/Problems/Services/Category'
import { EditCategorySchema, StoreCategorySchema } from 'App/Modules/Problems/Validators/Category'

export default class CategoriesController {
  public async list({ request, response }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')
    const categories = await listCategories({ page, perPage, search })
    return response.json(categories)
  }

  public async get({ params, response }: HttpContextContract): Promise<void> {
    const { id: categoryId } = params
    const category = await getCategory(categoryId)
    return response.json(category)
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const categoryDto = await request.validate({ schema: StoreCategorySchema })
    const category = await storeCategory(categoryDto)
    return response.json(category)
  }

  public async edit({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: categoryId } = params
    const categoryDto = await request.validate({ schema: EditCategorySchema })
    const category = await editCategory(categoryId, categoryDto)
    return response.json(category)
  }

  public async delete({ params, response }: HttpContextContract): Promise<void> {
    const { id: categoryId } = params
    await deleteCategory(categoryId)
    return response.json({ message: 'Category deleted successfully.' })
  }
}
