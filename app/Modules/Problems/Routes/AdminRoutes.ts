import Route from '@ioc:Adonis/Core/Route'
import CategoriesController from 'App/Modules/Problems/Controllers/Http/Admin/CategoriesController'
import ProblemsController from 'App/Modules/Problems/Controllers/Http/Admin/ProblemsController'

Route.group(() => {
  /**
   * Categories Routes
   */
  Route.group(() => {
    Route.get('/', new CategoriesController().list).as('categories.admin.list')
    Route.get('/:id', new CategoriesController().get).as('categories.admin.get')
    Route.post('/', new CategoriesController().store).as('categories.admin.store')
    Route.put('/:id', new CategoriesController().edit).as('categories.admin.edit')
    Route.delete('/:id', new CategoriesController().delete).as('categories.admin.delete')
  }).prefix('categories')

  /**
   * Problems Routes
   */
  Route.group(() => {
    Route.get('/', new ProblemsController().list).as('problems.admin.list')
    Route.get('/:id', new ProblemsController().get).as('problems.admin.get')
    Route.post('/', new ProblemsController().store).as('problems.admin.store')
    Route.put('/:id', new ProblemsController().edit).as('problems.admin.edit')
    Route.delete('/:id', new ProblemsController().delete).as('problems.admin.delete')
  }).prefix('problems')
})
  .prefix('admin')
  .middleware(['auth', 'acl:root,admin'])
