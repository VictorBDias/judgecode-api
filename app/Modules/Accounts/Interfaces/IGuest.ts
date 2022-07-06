import BaseInterface from 'App/Shared/Interfaces/BaseInterface'
import Guest from 'App/Modules/Accounts/Models/Guest'

export namespace IGuest {
  export interface Repository extends BaseInterface<typeof Guest>, Helpers {}

  export interface Helpers {}

  export namespace DTOs {
    export type List = {}

    export type Store = {
      name: string
      ra: string
    }

    export type Edit = {
      name?: string
      ra?: string
    }
  }
}
