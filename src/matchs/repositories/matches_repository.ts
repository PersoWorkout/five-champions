import { CreateMatchDTO } from '#src/matchs/DTOs/create_match_dto'
import { UpdateMatchDTO } from '#src/matchs/DTOs/update_match_dto'
import { Match } from '#src/matchs/models/match'

export class MatchesRepository {
  getAllBySeason(seasonId: string) {
    return Match.findManyBy({ seasonId })
  }

  getById(id: string) {
    return Match.findBy('id', id)
  }

  create(payload: CreateMatchDTO) {
    return Match.create({
      ...payload,
    })
  }

  update(match: Match, payload: UpdateMatchDTO) {
    return match
      .merge({
        matchDate: payload.matchDate ?? match.matchDate,
        mvpPlayerId: payload.mvpPlayerId ?? match.mvpPlayerId,
      })
      .save()
  }

  delete(match: Match) {
    return match.delete()
  }
}
