import { SeasonService } from '#src/seasons/services/season_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class CreateSeasonController {
  constructor(private service: SeasonService) {}

  #validator = vine.compile(
    vine.object({
      name: vine.string().trim(),
    })
  )

  async render({ request, inertia }: HttpContext) {
    const groupId = request.param('groupId')
    return inertia.render('seasons/create', { groupId })
  }

  async handle({ request, auth, response }: HttpContext) {
    const playerId = auth.user!.id
    const groupId = request.param('groupId')
    const payload = await request.validateUsing(this.#validator)

    const season = await this.service.create({ ...payload, groupId }, playerId)

    if (!season) {
      console.log('not found')
      return response.notFound()
    }

    return response.redirect().toPath(`/groups/${season.groupId}`)
  }
}
