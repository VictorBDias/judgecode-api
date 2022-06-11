import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  listProblems,
  getProblem,
  storeProblem,
  editProblem,
  deleteProblem,
} from 'App/Modules/Problems/Services/Problem'
import { EditProblemSchema, StoreProblemSchema } from 'App/Modules/Problems/Validators/Problem'

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

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const problemDto = await request.validate({ schema: StoreProblemSchema })
    const problem = await storeProblem(problemDto)
    return response.json(problem)
  }

  public async edit({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: problemId } = params
    const problemDto = await request.validate({ schema: EditProblemSchema })
    const problem = await editProblem(problemId, problemDto)
    return response.json(problem)
  }

  public async delete({ params, response }: HttpContextContract): Promise<void> {
    const { id: problemId } = params
    await deleteProblem(problemId)
    return response.json({ message: 'Problem deleted successfully.' })
  }
}
