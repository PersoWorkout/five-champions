import Group from '#src/groups/models/group'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Season extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare closingDate: Date

  @column()
  declare groupId: string

  @belongsTo(() => Group)
  declare group: BelongsTo<typeof Group>

  @column()
  declare createdAt: Date

  @column()
  declare updatedAt: Date
}
