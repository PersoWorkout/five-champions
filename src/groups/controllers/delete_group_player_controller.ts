import { GroupsPlayersService } from '#src/groups/services/groups_players_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class DeleteGroupPlayerController {
  constructor(private service: GroupsPlayersService) {}

  async handle({ request, response }: HttpContext) {
    const { groupId, playerId } = request.params()
    const groupPlayer = await this.service.delete(groupId, playerId)

    if (!groupPlayer) {
      return response.notFound()
    }

    return response.redirect().toPath('/groups/all')
  }
}
