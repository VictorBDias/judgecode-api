import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { getCategory, listCategories } from 'App/Modules/Problems/Services/Category'

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
}
