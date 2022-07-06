import { GuestsRepository } from 'App/Modules/Accounts/Repositories/GuestsRepository'
import { IGuest } from 'App/Modules/Accounts/Interfaces/IGuest'

import DTOs = IGuest.DTOs

const guestsRepository = new GuestsRepository()

export const storeGuest = async (data: DTOs.Store) => guestsRepository.store(data)
