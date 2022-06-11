import BaseRepository from 'App/Shared/Repositories/BaseRepository'
import Submission from 'App/Modules/Problems/Models/Submission'
import { ISubmission } from 'App/Modules/Problems/Interfaces/ISubmission'

export default class SubmissionsRepository
  extends BaseRepository<typeof Submission>
  implements ISubmission.Repository
{
  constructor() {
    super(Submission)
  }
}
