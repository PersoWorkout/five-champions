import { GroupsPlayersService } from '../services/groups_players_service.js'
import { GroupService } from '#src/groups/services/group_service'
import { inject } from '@adonisjs/core'
import vine from '@vinejs/vine'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CreateGroupController {
  constructor(
    private service: GroupService,
    private groupsPlayersService: GroupsPlayersService
  ) {}

  #validator = vine.compile(
    vine.object({
      name: vine.string().trim(),
    })
  )

  render({ inertia }: HttpContext) {
    return inertia.render('groups/create')
  }

  async handle({ request, auth, response, session }: HttpContext) {
    const player = auth.user!
    var { name } = await request.validateUsing(this.#validator)

    const group = await this.service.create(name, player.id)
    if (!group) {
      session.flash('errors', { messages: 'An error occured' })
      return response.redirect().back()
    }

    const groupPlayer = await this.groupsPlayersService.create(group.id, player.id)
    if (!groupPlayer) {
      session.flash('errors', { messages: 'An error occured' })
      return response.redirect().back()
    }

    //should be redirect to details page
    return response.redirect().toPath('/groups/all')
  }
}
