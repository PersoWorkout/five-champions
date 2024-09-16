import { SeasonService } from '#src/seasons/services/season_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GetSeasonByIdController {
  constructor(private service: SeasonService) {}

  async render({ request, auth, response, inertia }: HttpContext) {
    const playerId = auth.user!.id
    const { seasonId } = request.params()

    const season = await this.service.getById(seasonId, playerId)

    if (!season) {
      return response.notFound('Season not found')
    }

    return inertia.render('seasons/details', {
      season: {
        id: season.id,
        name: season.name,
        groupId: season.groupId,
        closingDate: season.closingDate,
      },
    })
  }
}
