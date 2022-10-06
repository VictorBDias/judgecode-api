import { DateTime } from 'luxon'
import HttpContext from '@ioc:Adonis/Core/HttpContext'

import { PaginateContractType } from 'App/Shared/Interfaces/BaseInterface'
import { ICategory } from 'App/Modules/Problems/Interfaces/ICategory'
import Category from 'App/Modules/Problems/Models/Category'
import CategoriesRepository from 'App/Modules/Problems/Repositories/CategoriesRepository'
import { CategoriesDefaults } from 'App/Modules/Problems/Defaults'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

import DTOs = ICategory.DTOs

const categoriesRepository = new CategoriesRepository()

export const listCategories = async ({
  page = 1,
  perPage = 10,
  search,
}: DTOs.List): Promise<PaginateContractType<typeof Category>> =>
  categoriesRepository.listWithPagination({
    page,
    perPage,
    scopes: (scopes) => {
      if (search) scopes.searchQueryScope(search)
    },
  })

export const getCategory = async (id: string): Promise<Category> => {
  const category = await categoriesRepository.findBy('id', id)
  if (!category) throw new NotFoundException('Category not found or not available.')
  return category
}

export const storeCategory = async ({
  problems,
  problems_ids,
  ...data
}: DTOs.Store): Promise<Category> => {
  const { auth } = HttpContext.get()!
  const category = await categoriesRepository.store(data)

  if (problems && problems.length > 0)
    await category
      .related('problems')
      .createMany([...problems.map((problem) => ({ ...problem, owner_id: auth.user!.id }))])
  if (problems_ids && problems_ids.length > 0)
    await category.related('problems').attach(problems_ids)

  await category.load('problems', (builder) => builder.orderBy('created_at', 'desc'))

  return category.refresh()
}

export const editCategory = async (
  id: string,
  { problems, problems_ids, ...data }: DTOs.Edit
): Promise<Category> => {
  const { auth } = HttpContext.get()!

  const category = await categoriesRepository.findBy('id', id)
  if (!category) throw new NotFoundException('Category not found or not available.')
  category.merge(data)
  await categoriesRepository.save(category)

  if (problems && problems.length > 0) {
    for (const { id: problemId, ...data } of problems) {
      if (problemId) {
        const problemExists = await category
          .related('problems')
          .query()
          .where('problems.id', problemId)
          .first()
        if (problemExists) {
          problemExists.merge(data)
          await problemExists.save()
        }
      } else await category.related('problems').create({ owner_id: auth.user!.id, ...data })
    }
  }
  if (problems_ids && problems_ids.length > 0) await category.related('problems').sync(problems_ids)

  await category.load('problems', (builder) => builder.orderBy('created_at', 'desc'))

  return category.refresh()
}

export const deleteCategory = async (id: string): Promise<void> => {
  const category = await categoriesRepository.findBy('id', id)
  if (!category) throw new NotFoundException('Category not found or not available.')
  category.merge({
    name: `deleted:${category.name}`,
    description: `deleted:${category.description}`,
    is_deleted: true,
    deleted_at: DateTime.now(),
  })
  await categoriesRepository.save(category)
}

export const storeDefaultCategories = async (): Promise<Array<InstanceType<typeof Category>>> =>
  categoriesRepository.storeMany(CategoriesDefaults)
