import type { CreateSeasonDTO } from '#src/seasons/DTOs/create_season_dto'
import type { UpdateSeasonDTO } from '#src/seasons/DTOs/update_season_dto'
import Season from '#src/seasons/models/season'

export class SeasonRepository {
  getAllByGroup(groupId: string) {
    return Season.findManyBy({ groupId })
  }

  getById(id: string) {
    return Season.findBy('id', id)
  }

  create(payload: CreateSeasonDTO) {
    return Season.create({
      ...payload,
    })
  }

  update(season: Season, payload: UpdateSeasonDTO) {
    return season
      .merge({
        ...payload,
      })
      .save()
  }

  delete(season: Season) {
    return season.delete()
  }
}
