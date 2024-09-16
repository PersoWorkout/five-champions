import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Player from '#src/players/models/players'
import Season from '#src/seasons/models/season'
import Team from '#src/teams/models/team'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'

export class Match extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column.dateTime()
  declare matchDate: DateTime

  @column()
  declare seasonId: string

  @hasOne(() => Season)
  declare season: HasOne<typeof Season>

  @column()
  declare playerId: string

  @hasOne(() => Player)
  declare player: HasOne<typeof Player>

  @column({ columnName: 'mvp_player_id' })
  declare mvpPlayerId: string | null

  @hasOne(() => Player)
  declare mvpPlayer: HasOne<typeof Player>

  @hasMany(() => Team)
  declare teams: HasMany<typeof Team>
}
