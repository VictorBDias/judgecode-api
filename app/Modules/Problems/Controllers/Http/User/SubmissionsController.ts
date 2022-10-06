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
  public async list({ request, response }: HttpContextContract): Promise<void> {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 10)
    const search = request.input('search', null)
    const problemId = request.input('problem_id', null)
    const guestId = request.input('guestId', null)

    const submissions = await listSubmissions({
      page,
      perPage,
      search,
      problemId,
      guestId,
    })
    return response.json(submissions)
  }

  public async get({ params, response }: HttpContextContract): Promise<void> {
    const { id: submissionId } = params
    const submission = await getSubmission(submissionId)
    return response.json(submission)
  }

  public async store({ request, response }: HttpContextContract): Promise<void> {
    const submissionDto = await request.validate({ schema: StoreSubmissionSchema })

    const submission = await storeSubmissions({ ...submissionDto })
    return response.json(submission)
  }

  public async edit({ request, params, response }: HttpContextContract): Promise<void> {
    const { id: submissionId } = params
    const submissionDto = await request.validate({ schema: EditSubmissionSchema })

    const submission = await editSubmission(submissionId, { ...submissionDto })
    return response.json(submission)
  }

  public async delete({ params, response }: HttpContextContract): Promise<void> {
    const { id: submissionId } = params
    await deleteSubmission(submissionId)
    return response.json({ message: 'Submission deleted successfully.' })
  }
}
