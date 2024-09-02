import { AuthService } from '#src/players/services/auth_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class GetCurrentPlayerController {
  constructor(private service: AuthService) {}

  async render({ inertia }: HttpContext) {
    return inertia.render('auth/me')
  }
}
