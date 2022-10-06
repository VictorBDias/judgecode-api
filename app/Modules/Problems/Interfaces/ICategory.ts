import BaseRepository from 'App/Shared/Repositories/BaseRepository'
import Category from 'App/Modules/Problems/Models/Category'
import { IProblem } from 'App/Modules/Problems/Interfaces/IProblem'

export namespace ICategory {
  export interface Repository extends BaseRepository<typeof Category> {}

  export namespace DTOs {
    export type List = {
      page: number
      perPage: number
      search?: string
    }

    export type Store = {
      name: string
      description?: string
      problems?: Array<IProblem.DTOs.Store>
      problems_ids?: Array<string>
    }

    export type Edit = {
      name?: string
      description?: string
      problems?: Array<IProblem.DTOs.Edit>
      problems_ids?: Array<string>
    }
  }
}
