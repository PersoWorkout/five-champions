import { DateTime } from 'luxon'

export interface UpdateMatchDTO {
  matchDate: DateTime | null
  mvpPlayerId: string | null
}
