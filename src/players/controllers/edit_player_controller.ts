import { AuthService } from '#src/players/services/auth_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class EditPlayerController {
  constructor(private service: AuthService) {}

  #validator = vine.compile(
    vine.object({
      surname: vine.string().nullable(),
      email: vine.string().email().nullable(),
    })
  )

  async handle({ auth, request, response, session }: HttpContext) {
    const payload = await request.validateUsing(this.#validator)

    const user = auth.user
    const result = await this.service.edit(String(user!.id), payload)
    if (!result) {
      session.flash('errors', { messages: 'Invalid Request' })
      return response.redirect().back()
    }

    auth.user?.refresh()
    response.redirect('/')
  }
}
