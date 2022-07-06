import Route from '@ioc:Adonis/Core/Route'

import CategoriesController from 'App/Modules/Problems/Controllers/Http/User/CategoriesController'
import ProblemsController from 'App/Modules/Problems/Controllers/Http/User/ProblemsController'
import SubmissionsController from 'App/Modules/Problems/Controllers/Http/User/SubmissionsController'

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

  /**
   * Submissions Routes
   */
  Route.group(() => {
    Route.get('/', new SubmissionsController().list).as('submissions.list')
    Route.get('/:id', new SubmissionsController().get).as('submissions.get')
    Route.post('/', new SubmissionsController().store).as('submissions.store')
    Route.put('/:id', new SubmissionsController().edit).as('submissions.edit')
    Route.delete('/:id', new SubmissionsController().delete).as('submissions.delete')
  }).prefix('submissions')
})
