import Route from '@ioc:Adonis/Core/Route'
import CategoriesController from 'App/Modules/Problems/Controllers/Http/User/CategoriesController'

Route.group(() => {
  /**
   * Categories Routes
   */
  Route.get('/', new CategoriesController().list).as('categories.list')
})
  .prefix('categories')
  .middleware(['auth', 'acl:root,admin,user,guest'])
