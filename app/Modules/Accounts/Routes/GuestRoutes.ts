import Route from '@ioc:Adonis/Core/Route'

import GuestsControllers from 'App/Modules/Accounts/Controllers/Http/User/GuestsControllers'

Route.group(() => {
  Route.post('/', new GuestsControllers().store).as('guest.store')
}).prefix('guests')
