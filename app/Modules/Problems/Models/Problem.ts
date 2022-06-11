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
import User from 'App/Modules/Accounts/Models/User'
import Category from 'App/Modules/Problems/Models/Category'

export default class Problem extends BaseModel {
  public static table = 'problems'

  /**
   * ------------------------------------------------------
   * Columns
   * ------------------------------------------------------
   * - column typing struct
   */
  @column({ isPrimary: true })
  public id: string

  @column()
  public title: string

  @column()
  public body: string

  @column()
  public owner_id: string

  @column()
  public category_id: string

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
   * - define Problem model relationships
   */
  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'owner_id',
  })
  public owner: BelongsTo<typeof User>

  @belongsTo(() => Category, {
    localKey: 'id',
    foreignKey: 'category_id',
  })
  public category: BelongsTo<typeof Category>

  /**
   * ------------------------------------------------------
   * Hooks
   * ------------------------------------------------------
   */
  @afterFind()
  public static async loadProblemsRelationsOnGet(problem: Problem): Promise<void> {
    await problem.load('category')
    await problem.load('owner')
  }

  @afterFetch()
  @afterPaginate()
  public static async loadProblemsRelationsOnPaginate(problems: Array<Problem>): Promise<void> {
    for (const problem of problems) {
      await problem.load('category')
      await problem.load('owner')
    }
  }

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */
  public static searchQueryScope = scope((query, search) => {
    const fields = ['title', 'body']
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
