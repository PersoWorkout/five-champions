import { GroupsPlayersRepository } from '#src/groups/repositories/groups_players_repository'
import { CreateMatchDTO } from '#src/matchs/DTOs/create_match_dto'
import { UpdateMatchDTO } from '#src/matchs/DTOs/update_match_dto'
import { MatchesRepository } from '#src/matchs/repositories/matches_repository'
import { SeasonRepository } from '#src/seasons/repositories/season_repository'
import { inject } from '@adonisjs/core'

@inject()
export class MatchService {
  constructor(
    private repository: MatchesRepository,
    private seasonRepository: SeasonRepository,
    private groupPlayerRepository: GroupsPlayersRepository
  ) {}

  async getAllBySeason(seasonId: string) {
    return this.repository.getAllBySeason(seasonId)
  }

  async getById(id: string) {
    return this.repository.getById(id)
  }

  async create(payload: CreateMatchDTO) {
    const season = await this.seasonRepository.getById(payload.seasonId)
    if (!season) {
      return null
    }

    const player = await this.groupPlayerRepository.getByPlayerAndGroup(
      payload.playerId,
      season.groupId
    )
    if (!player) {
      return null
    }

    return this.repository.create(payload)
  }

  async update(id: string, playerId: string, payload: UpdateMatchDTO) {
    const match = await this.repository.getById(id)
    if (!match) {
      return null
    }

    const season = await this.seasonRepository.getById(match.seasonId)
    if (!season) {
      return null
    }

    const player = await this.groupPlayerRepository.getByPlayerAndGroup(playerId, season.groupId)
    if (!player) {
      return null
    }

    return this.repository.update(match, payload)
  }

  async delete(id: string, playerId: string) {
    const match = await this.repository.getById(id)
    if (!match) {
      return null
    }

    const season = await this.seasonRepository.getById(match.seasonId)
    if (!season) {
      return null
    }

    const player = await this.groupPlayerRepository.getByPlayerAndGroup(playerId, season.groupId)
    if (!player) {
      return null
    }

    return this.repository.delete(match)
  }
}
