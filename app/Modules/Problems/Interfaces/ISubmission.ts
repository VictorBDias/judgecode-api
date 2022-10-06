import BaseInterface from 'App/Shared/Interfaces/BaseInterface'
import Submission from 'App/Modules/Problems/Models/Submission'

export namespace ISubmission {
  export interface Repository extends BaseInterface<typeof Submission> {}

  export namespace DTOs {
    export type List = {
      page: number
      perPage: number
      search?: string
      problemId?: string
      guestId?: string
    }

    export type Store = {
      source_code: string
      language: string
      guest_id: string
      problem_ids: Array<string>
    }

    export type Edit = {
      source_code?: string
      language?: string
      guest_id?: string
      problem_ids?: Array<string>
    }
  }
}
