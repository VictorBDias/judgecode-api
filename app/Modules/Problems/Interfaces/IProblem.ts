import BaseInterface from 'App/Shared/Interfaces/BaseInterface'
import Problem from 'App/Modules/Problems/Models/Problem'

export namespace IProblem {
  export interface Repository extends BaseInterface<typeof Problem> {}

  export namespace DTOs {
    export type List = {
      page: number
      perPage: number
      search: string
      categoryId?: string
    }

    export type Store = {
      title: string
      body: string
      language: string
      owner_id: string
      category_id: string
    }

    export type Edit = {
      title?: string
      body?: string
      language?: string
      owner_id?: string
      category_id?: string
    }
  }
}
