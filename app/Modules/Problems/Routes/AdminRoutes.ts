import Route from '@ioc:Adonis/Core/Route'
import CategoriesController from 'App/Modules/Problems/Controllers/Http/Admin/CategoriesController'

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
})
  .prefix('admin')
  .middleware(['auth', 'acl:root,admin'])
