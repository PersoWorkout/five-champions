import { inject } from '@adonisjs/core'
import { AuthService } from '../services/auth_service.js'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

@inject()
export default class LoginController {
  constructor(private service: AuthService) {}

  #validator = vine.compile(
    vine.object({
      email: vine.string().trim().email(),
      password: vine.string().trim(),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }

  async handle({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(this.#validator)

    const player = await this.service.login(email, password)

    await auth.use('web').login(player)

    return response.redirect('/')
  }
}
