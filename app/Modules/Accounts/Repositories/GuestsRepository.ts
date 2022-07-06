import BaseRepository from 'App/Shared/Repositories/BaseRepository'

import { IGuest } from 'App/Modules/Accounts/Interfaces/IGuest'
import Guest from 'App/Modules/Accounts/Models/Guest'

export class GuestsRepository extends BaseRepository<typeof Guest> implements IGuest.Repository {
  constructor() {
    super(Guest)
  }
}
