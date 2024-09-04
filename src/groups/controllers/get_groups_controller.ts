import { inject } from '@adonisjs/core'
import { GroupService } from '#src/groups/services/group_service'
import type { HttpContext } from '@adonisjs/core/http'
import { GetGroupsPresenter } from '../presenter/get_groups_presenter.js'

@inject()
export default class GetGroupsController {
  constructor(
    private service: GroupService,
    private presenter: GetGroupsPresenter
  ) {}

  async render({ auth, inertia }: HttpContext) {
    const player = auth.user!
    const groups = await this.service.getAll(player.id)
    return inertia.render('groups/all', this.presenter.toJson(groups))
  }
}
