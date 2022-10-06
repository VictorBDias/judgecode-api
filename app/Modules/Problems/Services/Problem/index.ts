import { DateTime } from 'luxon'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

import { PaginateContractType } from 'App/Shared/Interfaces/BaseInterface'
import { IProblem } from 'App/Modules/Problems/Interfaces/IProblem'
import Problem from 'App/Modules/Problems/Models/Problem'
import ProblemsRepository from 'App/Modules/Problems/Repositories/ProblemsRepository'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

import DTOs = IProblem.DTOs

const problemsRepository = new ProblemsRepository()

export const listProblems = async ({
  page = 1,
  perPage = 10,
  search,
  categoryId,
}: DTOs.List): Promise<PaginateContractType<typeof Problem>> =>
  problemsRepository.listWithPagination({
    page,
    perPage,
    scopes: (scopes) => {
      if (search) scopes.searchQueryScope(search)
      if (categoryId) scopes.filterByCategoryQueryScope(categoryId)
    },
  })

export const getProblem = async (id: string): Promise<Problem> => {
  const problem = await problemsRepository.findBy('id', id)
  if (!problem) throw new NotFoundException('Problem not found or not available.')
  return problem
}

export const storeProblem = async ({ owner_id, ...data }: DTOs.Store): Promise<Problem> => {
  const { auth } = HttpContext.get()!

  const problem = await problemsRepository.store({
    owner_id: owner_id || auth.user!.id,
    ...data,
  })

  return problem.refresh()
}

export const editProblem = async (
  id: string,
  { owner_id, ...data }: DTOs.Edit
): Promise<Problem> => {
  const problem = await problemsRepository.findBy('id', id)
  if (!problem) throw new NotFoundException('Problem not found or not available.')

  problem.merge({
    owner_id: owner_id || problem.owner_id,
    ...data,
  })
  await problemsRepository.save(problem)

  return problem
}

export const deleteProblem = async (id: string): Promise<void> => {
  const problem = await problemsRepository.findBy('id', id)
  if (!problem) throw new NotFoundException('Problem not found or not available.')
  problem.merge({
    title: `deleted:${problem.title}`,
    body: `deleted:${problem.body}`,
    is_deleted: true,
    deleted_at: DateTime.now(),
  })
  await problemsRepository.save(problem)
}
