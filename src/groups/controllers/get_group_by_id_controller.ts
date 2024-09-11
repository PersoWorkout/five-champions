import { inject } from '@adonisjs/core'
import { GroupService } from '../services/group_service.js'
import { HttpContext } from '@adonisjs/core/http'
import { GetGroupByIdPresenter } from '../presenter/get_group_by_id_presenter.js'

@inject()
export default class GetGroupByIdController {
  constructor(
    private service: GroupService,
    private presenter: GetGroupByIdPresenter
  ) {}

  async render({ auth, request, response, inertia }: HttpContext) {
    const playerId = auth.user!.id
    const groupId = request.param('id')

    const group = await this.service.getById(playerId, groupId)
    if (!group) {
      return response.notFound()
    }

    console.log(group.groupInvitation)

    return inertia.render('groups/details', this.presenter.toJson(group))
  }
}
