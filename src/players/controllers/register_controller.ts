import { AuthService } from '#src/players/services/auth_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class RegisterController {
  constructor(private readonly service: AuthService) {}

  #validator = vine.compile(
    vine.object({
      surname: vine.string().trim(),
      email: vine.string().trim().email(),
      password: vine.string().trim().minLength(8).confirmed(),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async handle({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(this.#validator)

    const player = await this.service.create(payload)

    if (!player) {
      session.flash('errors', { message: 'Invalid Request' })
      return response.redirect().back()
    }

    response.redirect('/')
  }
}
