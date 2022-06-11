import { DateTime } from 'luxon'

import { PaginateContractType } from 'App/Shared/Interfaces/BaseInterface'
import { ICategory } from 'App/Modules/Problems/Interfaces/ICategory'
import Category from 'App/Modules/Problems/Models/Category'
import CategoriesRepository from 'App/Modules/Problems/Repositories/CategoriesRepository'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

import DTOs = ICategory.DTOs
import { CategoriesDefaults } from 'App/Modules/Problems/Defaults'

const categoriesRepository = new CategoriesRepository()

export const listCategories = async ({
  page = 1,
  perPage = 10,
  search = '',
}: DTOs.List): Promise<PaginateContractType<typeof Category>> =>
  categoriesRepository.listWithPagination({
    page,
    perPage,
    scopes: (scopes) => {
      scopes.searchQueryScope(search)
    },
  })

export const getCategory = async (id: string): Promise<Category> => {
  const category = await categoriesRepository.findBy('id', id)
  if (!category) throw new NotFoundException('Category not found or not available.')
  return category
}

export const storeCategory = async (data: DTOs.Store): Promise<Category> =>
  categoriesRepository.store(data)

export const editCategory = async (id: string, data: DTOs.Edit): Promise<Category> => {
  const category = await categoriesRepository.findBy('id', id)
  if (!category) throw new NotFoundException('Category not found or not available.')
  category.merge(data)
  await categoriesRepository.save(category)
  return category
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
