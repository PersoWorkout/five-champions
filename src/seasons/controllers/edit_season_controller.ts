import { SeasonService } from '#src/seasons/services/season_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class EditSeasonController {
  constructor(private service: SeasonService) {}

  #validator = vine.compile(
    vine.object({
      name: vine.string().trim(),
    })
  )

  async handle({ request, response, session, auth }: HttpContext) {
    const payload = await request.validateUsing(this.#validator)

    const { seasonId } = request.params()
    const playerId = auth.user!.id

    const result = await this.service.update(seasonId, payload, playerId)
    if (!result) {
      session.flash('errors', { messages: 'An error occured' })
      return response.redirect().back()
    }

    return response.redirect().toPath(`/groups/${result.groupId}`)
  }
}
