import Route from '@ioc:Adonis/Core/Route'
import CategoriesController from 'App/Modules/Problems/Controllers/Http/Admin/CategoriesController'

Route.group(() => {
  /**
   * Categories Routes
   */
  Route.group(() => {
    Route.get('/', new CategoriesController().list).as('categories.admin.list')
    Route.get('/:id', new CategoriesController().list).as('categories.admin.list')
    Route.post('/', new CategoriesController().list).as('categories.admin.list')
    Route.put('/:id', new CategoriesController().list).as('categories.admin.list')
    Route.delete('/:id', new CategoriesController().list).as('categories.admin.list')
  }).prefix('categories')
})
  .prefix('admin')
  .middleware(['auth', 'acl:root,admin'])
