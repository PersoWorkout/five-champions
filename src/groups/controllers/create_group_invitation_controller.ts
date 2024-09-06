import { GroupInvitationService } from '../services/group_invitation_service.js'
import { inject } from '@adonisjs/core'
import {
  type AskableUsersType,
  CreateGroupInvitationPresenter,
} from '#src/groups/presenter/create_group_invitation_presenter'
import type { HttpContext } from '@adonisjs/core/http'

@inject()
export default class CreateGroupInvitationController {
  constructor(
    private service: GroupInvitationService,
    private presenter: CreateGroupInvitationPresenter
  ) {}

  async render({ request, inertia }: HttpContext) {
    const groupId = request.param('id')
    const players = await this.service.getAskableUsers(groupId)

    return inertia.render('groups/invitations/create', {
      players: this.presenter.toJson(players),
      groupId,
    } as CreateGroupsInvitationPageProps)
  }

  async handle({ request, session, response, auth }: HttpContext) {
    const { groupId, playerId } = request.params()
    const sender = auth.user!

    const invitation = await this.service.create({ groupId, playerId, senderId: sender.id })
    if (!invitation) {
      session.flash('errors', { messages: 'An error occured' })
      return response.redirect().back()
    }

    return response.redirect().toPath(`/groups/${groupId}`)
  }
}

export type CreateGroupsInvitationPageProps = {
  players: AskableUsersType
  groupId: string
}
