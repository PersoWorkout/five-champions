import { DateTime } from 'luxon'

export interface CreateMatchDTO {
  matchDate: DateTime
  seasonId: string
  playerId: string
}
