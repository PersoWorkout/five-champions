import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Group from '#src/groups/models/group'
import Player from '#src/players/models/players'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class GroupsPlayers extends BaseModel {
  @column({ isPrimary: true })
  declare groupId: string

  @column({ isPrimary: true })
  declare playerId: string

  @belongsTo(() => Group)
  declare group: BelongsTo<typeof Group>

  @belongsTo(() => Player)
  declare player: BelongsTo<typeof Player>
}
