import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { storeGuest } from 'App/Modules/Accounts/Services/Guest'
import { StoreGuestSchema } from 'App/Modules/Accounts/Validators/Guest'

export default class GuestsControllers {
  public async store({ request, response }: HttpContextContract): Promise<void> {
    const guestDto = await request.validate({ schema: StoreGuestSchema })
    const guest = await storeGuest(guestDto)
    return response.json(guest)
  }
}
