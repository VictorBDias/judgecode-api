import { DateTime } from 'luxon'
import {
  afterFetch,
  afterFind,
  afterPaginate,
  BelongsTo,
  belongsTo,
  column,
  scope,
} from '@ioc:Adonis/Lucid/Orm'

import BaseModel from 'App/Shared/Models/BaseModel'
import Problem from 'App/Modules/Problems/Models/Problem'

import Guest from 'App/Modules/Accounts/Models/Guest'

export default class Submission extends BaseModel {
  public static table = 'submissions'

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @column({ isPrimary: true })
  public id: string

  @column()
  public source_code: string

  @column()
  public language: string

  @column()
  public problem_id: string

  @column()
  public guest_id: string

  @column({ serializeAs: null })
  public is_deleted: boolean

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updated_at: DateTime

  @column.dateTime({ autoUpdate: true, serializeAs: null })
  public deleted_at: DateTime

  /**
   * ------------------------------------------------------
   * Relationships
   * ------------------------------------------------------
   * - define Submission model relationships
   */
  @belongsTo(() => Problem, {
    localKey: 'id',
    foreignKey: 'problem_id',
  })
  public problem: BelongsTo<typeof Problem>

  @belongsTo(() => Guest, {
    localKey: 'id',
    foreignKey: 'guest_id',
  })
  public guest: BelongsTo<typeof Guest>

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  @afterFind()
  public static async loadSubmissionRelationsOnGet(submission: Submission): Promise<void> {
    await submission.load('problem')
    await submission.load('guest')
  }

  @afterFetch()
  @afterPaginate()
  public static async loadSubmissionRelationsOnPaginate(
    submissions: Array<Submission>
  ): Promise<void> {
    for (const submission of submissions) {
      await submission.load('problem')
      await submission.load('guest')
    }
  }

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */
  public static searchQueryScope = scope((query, search) => {
    const fields = ['source_code', 'language']
    let sql = ''

    fields.forEach(
      (field, i) => (sql = `${sql} ${i !== 0 ? ' or ' : ' '} ${field} ilike '%${search}%'`)
    )

    return query.whereRaw(`(${sql})`)
  })

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
}
