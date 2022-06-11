import BaseModel from 'App/Shared/Models/BaseModel'
import { BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

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

  /**
   * ------------------------------------------------------
   * Query Scopes
   * ------------------------------------------------------
   */

  /**
   * ------------------------------------------------------
   * Misc
   * ------------------------------------------------------
   */
}
