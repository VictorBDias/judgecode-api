import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import {
  listSubmissions,
  getSubmission,
  storeSubmissions,
  editSubmission,
  deleteSubmission,
} from 'App/Modules/Problems/Services/Submission'
import {
  EditSubmissionSchema,
  StoreSubmissionSchema,
} from 'App/Modules/Problems/Validators/Submission'

export default class SubmissionsController {
  public async list({ request, response, auth }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', '')
    const problemId = request.input('problem_id', null)
    const user = auth.user!
    const submissions = await listSubmissions({ page, perPage, search, problemId, userId: user.id })
    return response.json(submissions)
  }

  public async get({ params, response }: HttpContextContract): Promise<void> {
    const { id: submissionId } = params
    const submission = await getSubmission(submissionId)
    return response.json(submission)
  }

  public async store({ request, response, auth }: HttpContextContract): Promise<void> {
    const submissionDto = await request.validate({ schema: StoreSubmissionSchema })
    const user = auth.user!
    const submission = await storeSubmissions({ user_id: user.id, ...submissionDto })
    return response.json(submission)
  }

  public async edit({ request, params, response, auth }: HttpContextContract): Promise<void> {
    const { id: submissionId } = params
    const submissionDto = await request.validate({ schema: EditSubmissionSchema })
    const user = auth.user!
    const submission = await editSubmission(submissionId, { user_id: user.id, ...submissionDto })
    return response.json(submission)
  }

  public async delete({ params, response }: HttpContextContract): Promise<void> {
    const { id: submissionId } = params
    await deleteSubmission(submissionId)
    return response.json({ message: 'Submission deleted successfully.' })
  }
}
