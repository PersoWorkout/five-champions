import { GroupInvitationStatus } from '#src/groups/enums/group_invitation_status'
import { GroupInvitationService } from '#src/groups/services/group_invitation_service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class AcceptGroupInvitationController {
  constructor(private service: GroupInvitationService) {}

  async handle({ auth, request, response }: HttpContext) {
    const playerId = auth.user!.id
    const groupId = request.param('groupId')

    const groupInvitation = await this.service.updateStatus(
      playerId,
      groupId,
      GroupInvitationStatus.Accepted
    )

    if (!groupInvitation) {
      return response.notFound()
    }

    return response.redirect().withQs().back()
  }
}
