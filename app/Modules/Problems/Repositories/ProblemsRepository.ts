import BaseRepository from 'App/Shared/Repositories/BaseRepository'
import Problem from 'App/Modules/Problems/Models/Problem'
import { IProblem } from 'App/Modules/Problems/Interfaces/IProblem'

export default class ProblemsRepository
  extends BaseRepository<typeof Problem>
  implements IProblem.Repository
{
  constructor() {
    super(Problem)
  }
}
