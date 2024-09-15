import { GroupsPlayersRepository } from '#src/groups/repositories/groups_players_repository'
import { CreateSeasonDTO } from '#src/seasons/DTOs/create_season_dto'
import { UpdateSeasonDTO } from '#src/seasons/DTOs/update_season_dto'
import { SeasonRepository } from '#src/seasons/repositories/season_repository'
import { inject } from '@adonisjs/core'

@inject()
export class SeasonService {
  constructor(
    private repository: SeasonRepository,
    private groupPlayerRepository: GroupsPlayersRepository
  ) {}

  async getAllByGroup(groupId: string, playerId: string) {
    const exist = await this.groupPlayerRepository.getByPlayerAndGroup(groupId, playerId)
    if (!exist) {
      return null
    }
    return this.repository.getAllByGroup(groupId)
  }

  async getById(id: string, playerId: string) {
    const season = await this.repository.getById(id)
    if (!season) {
      return null
    }

    const exist = await this.groupPlayerRepository.getByPlayerAndGroup(season.groupId, playerId)
    if (!exist) {
      return null
    }

    return season
  }

  async create(payload: CreateSeasonDTO, playerId: string) {
    const exist = await this.groupPlayerRepository.getByPlayerAndGroup(payload.groupId, playerId)
    if (!exist) {
      console.log('unauthorized')
      return null
    }

    return await this.repository.create(payload)
  }

  async update(id: string, payload: UpdateSeasonDTO, playerId: string) {
    const season = await this.repository.getById(id)
    if (!season) {
      return null
    }

    const exist = await this.groupPlayerRepository.getByPlayerAndGroup(season.groupId, playerId)
    if (!exist) {
      return null
    }

    return this.repository.update(season, payload)
  }

  async delete(id: string, playerId: string) {
    const season = await this.repository.getById(id)
    if (!season) {
      return null
    }

    const exist = await this.groupPlayerRepository.getByPlayerAndGroup(season.groupId, playerId)
    if (!exist) {
      return null
    }

    return this.repository.delete(season)
  }
}
