import Route from '@ioc:Adonis/Core/Route'

import CategoriesController from 'App/Modules/Problems/Controllers/Http/Admin/CategoriesController'

Route.group(() => {
  /**
   * Categories Routes
   */
  Route.group(() => {
    Route.get('/', new CategoriesController().list).as('categories.guest.list')
    Route.get('/:id', new CategoriesController().get).as('categories.guest.get')
  }).prefix('categories')
}).prefix('guest')
