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
  guestId,
}: DTOs.List): Promise<PaginateContractType<typeof Submission>> =>
  submissionsRepository.listWithPagination({
    page,
    perPage,
    scopes: (scopes) => {
      if (search) scopes.searchQueryScope(search)
      if (problemId) scopes.filterByProblemIdQueryScope(problemId)
      if (guestId) scopes.filterByGuestIdQueryScope(guestId)
    },
  })

export const getSubmission = async (id: string): Promise<Submission> => {
  const submission = await submissionsRepository.findBy('id', id)
  if (!submission) throw new NotFoundException('Submission not found or not available.')
  return submission
}

export const storeSubmissions = async ({
  problem_ids,
  ...data
}: DTOs.Store): Promise<Submission> => {
  const submission = await submissionsRepository.store(data)
  if (problem_ids && problem_ids.length > 0) await submission.related('problems').sync(problem_ids)
  return submission.refresh()
}

export const editSubmission = async (
  id: string,
  { problem_ids, ...data }: DTOs.Edit
): Promise<Submission> => {
  const submission = await submissionsRepository.findBy('id', id)
  if (!submission) throw new NotFoundException('Submission not found or not available.')
  submission.merge(data)
  await submissionsRepository.save(submission)

  if (problem_ids && problem_ids.length > 0) await submission.related('problems').sync(problem_ids)

  return submission.refresh()
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
