import Player from '#src/players/models/players'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { DateTime } from 'luxon'
import GroupsInvitations from '#src/groups/models/groups_invitations'
import GroupsPlayers from './groups_players.js'
import Season from '#src/seasons/models/season'

export default class Group extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column({ columnName: 'creator_id' })
  declare playerId: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Player)
  declare creator: BelongsTo<typeof Player>

  @hasMany(() => GroupsInvitations)
  declare groupInvitation: HasMany<typeof GroupsInvitations>

  @hasMany(() => GroupsPlayers)
  declare groupPlayer: HasMany<typeof GroupsPlayers>

  @hasMany(() => Season)
  declare seasons: HasMany<typeof Season>
}
