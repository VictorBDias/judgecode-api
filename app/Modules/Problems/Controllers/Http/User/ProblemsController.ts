import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { getProblem, listProblems } from 'App/Modules/Problems/Services/Problem'

export default class ProblemsController {
  public async list({ request, response }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')
    const categoryId = request.input('category_id', null)
    const problems = await listProblems({ page, perPage, search, categoryId })
    return response.json(problems)
  }

  public async get({ params, response }: HttpContextContract): Promise<void> {
    const { id: problemId } = params
    const problem = await getProblem(problemId)
    return response.json(problem)
  }
}
