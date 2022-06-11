import Route from '@ioc:Adonis/Core/Route'

import CategoriesController from 'App/Modules/Problems/Controllers/Http/User/CategoriesController'
import ProblemsController from 'App/Modules/Problems/Controllers/Http/User/ProblemsController'

Route.group(() => {
  /**
   * Categories Routes
   */
  Route.group(() => {
    Route.get('/', new CategoriesController().list).as('categories.list')
    Route.get('/:id', new CategoriesController().get).as('categories.get')
  }).prefix('categories')

  /**
   * Problems Routes
   */
  Route.group(() => {
    Route.get('/', new ProblemsController().list).as('problems.list')
    Route.get('/:id', new ProblemsController().get).as('problems.get')
  }).prefix('problems')
}).middleware(['auth', 'acl:root,admin,user,guest'])
