import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import { GroupInvitationStatus } from '#src/groups/enums/group_invitation_status'
import Group from '#src/groups/models/group'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Player from '#src/players/models/players'

export default class GroupInvitation extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare status: GroupInvitationStatus

  @column()
  declare groupId: string

  @column()
  declare playerId: string

  @column()
  declare senderId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @belongsTo(() => Group)
  declare group: BelongsTo<typeof Group>

  @belongsTo(() => Player)
  declare player: BelongsTo<typeof Player>

  @belongsTo(() => Player)
  declare sender: BelongsTo<typeof Player>
}
