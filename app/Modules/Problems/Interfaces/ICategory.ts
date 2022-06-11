import BaseRepository from 'App/Shared/Repositories/BaseRepository'
import Category from 'App/Modules/Problems/Models/Category'

export namespace ICategory {
  export interface Repository extends BaseRepository<typeof Category> {}

  export namespace DTOs {
    export type List = {
      page: number
      perPage: number
      search: string
    }

    export type Store = {
      name: string
      description?: string
    }

    export type Update = {
      name?: string
      description?: string
    }
  }
}
