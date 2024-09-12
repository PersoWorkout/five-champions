import { GroupInvitationStatus } from '#src/groups/enums/group_invitation_status'
import { GroupInvitationService } from '#src/groups/services/group_invitation_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class RejectGroupInvitationController {
  constructor(private service: GroupInvitationService) {}

  async handle({ auth, request, response }: HttpContext) {
    const playerId = auth.user!.id
    const groupId = request.param('groupId')
    const invitationId = request.param('invitationId')

    const groupInvitation = await this.service.updateStatus(
      playerId,
      groupId,
      invitationId,
      GroupInvitationStatus.Rejected
    )

    if (!groupInvitation) {
      return response.notFound()
    }

    return response.redirect().toPath('/groups/all')
  }
}
