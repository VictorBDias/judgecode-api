import { DateTime } from 'luxon'

import { PaginateContractType } from 'App/Shared/Interfaces/BaseInterface'
import { ISubmission } from 'App/Modules/Problems/Interfaces/ISubmission'
import Submission from 'App/Modules/Problems/Models/Submission'
import SubmissionsRepository from 'App/Modules/Problems/Repositories/SubmissionsRepository'
import NotFoundException from 'App/Shared/Exceptions/NotFoundException'

import DTOs = ISubmission.DTOs

const submissionsRepository = new SubmissionsRepository()

export const listSubmissions = async ({
  page,
  perPage,
  search,
  problemId,
  userId,
}: DTOs.List): Promise<PaginateContractType<typeof Submission>> =>
  submissionsRepository.listWithPagination({
    page,
    perPage,
    scopes: (scopes) => scopes.searchQueryScope(search),
    clauses: {
      where: problemId ? { problem_id: problemId, user_id: userId } : { user_id: userId },
    },
  })

export const getSubmission = async (id: string): Promise<Submission> => {
  const submission = await submissionsRepository.findBy('id', id)
  if (!submission) throw new NotFoundException('Submission not found or not available.')
  return submission
}

export const storeSubmissions = async (data: DTOs.Store): Promise<Submission> =>
  submissionsRepository.store(data)

export const editSubmission = async (id: string, data: DTOs.Edit): Promise<Submission> => {
  const submission = await submissionsRepository.findBy('id', id)
  if (!submission) throw new NotFoundException('Submission not found or not available.')
  submission.merge(data)
  await submissionsRepository.save(submission)
  return submission
}

export const deleteSubmission = async (id: string): Promise<void> => {
  const submission = await submissionsRepository.findBy('id', id)
  if (!submission) throw new NotFoundException('Submission not found or not available.')
  submission.merge({
    source_code: `deleted:${submission.source_code}`,
    language: `deleted:${submission.language}`,
    is_deleted: true,
    deleted_at: DateTime.now(),
  })
  await submissionsRepository.save(submission)
}
